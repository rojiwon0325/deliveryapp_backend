import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import {
  ByIdDTO,
  ByPassportDTO,
  ReadorCreateDTO,
  UpdateRole,
  UserPartial,
} from './user.dto';
import { JwtPayload } from '@jwt/jwt.dto';
import { CookieOptions } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepositry: Repository<User>,
  ) {}

  /**
   *
   * @param  User passport정보를 포함한 사용자 정보
   * @returns 사용자를 생성하거나 찾았을 경우, 해당 사용자 정보를 담은 JwtPayload 반환
   * @returns 에러가 발생하여 정상적으로 함수가 실행되지 않은 경우 null 반환
   * @returns 해당 이메일을 사용중인 다른 사용자가 존재할 경우, false 반환
   */
  async readOrCreateByPassport({
    passport_type,
    passport_id,
    email,
    ...rest
  }: ReadorCreateDTO): Promise<JwtPayload | null | false> {
    try {
      const [user, exist] = await Promise.all([
        this.userRepositry.findOne({
          passport_type,
          passport_id,
        }),
        this.userRepositry.findOne({ email: email ?? 'default@default.com' }),
        // 사용자의 email이 null일 경우, exist is null
        // 사용자의 email이 null이 아닌 경우, exist is user
        // 사용자의 기존 email이 null이지만 현재 값이 추가된 경우,
        // exist is not user, exist가 null일 경우 해당 email사용 가능
      ]);
      if (user) {
        for (const [key, val] of Object.entries(rest)) user[key] = val;
        if (email !== null && exist === null) user.email = email; // email 정보가 변경된 경우
        const { id, role } = await this.userRepositry.save(user);
        return { sub: id, role };
      } // 사용자가 이미 있는 경우

      if (exist && user.id !== exist.id) {
        return false;
      } // 사용자는 없지만 이메일이 이미 사용중인 경우

      const { id, role } = await this.userRepositry.save(
        this.userRepositry.create({
          ...rest,
          email,
          passport_type,
          passport_id,
        }),
      );
      return { sub: id, role };
    } catch {
      return null;
    }
  }

  async readById({ id }: ByIdDTO): Promise<UserPartial | null> {
    try {
      return this.userRepositry.findOne(
        { id },
        { select: ['email', 'username', 'role', 'id'] },
      );
    } catch {
      return null;
    }
  }

  async updateRole(
    { id, role }: UpdateRole,
    cb: (name: string, options?: CookieOptions) => any,
  ): Promise<UserPartial | null> {
    try {
      const user = await this.userRepositry.findOneOrFail(
        { id },
        { select: ['email', 'username', 'role', 'id'] },
      );
      if (role === UserRole.Admin || role === UserRole.Undefined) {
        return null;
      }

      user.role = role;
      await this.userRepositry.save(user);
      cb('jwt');
      return user;
    } catch {
      return null;
    }
  }
  async deleteById({ id }: ByIdDTO): Promise<boolean> {
    try {
      await this.userRepositry.delete({ id });
      return true;
    } catch {
      return false;
    }
  }

  async deleteByPassport({
    passport_type,
    passport_id,
  }: ByPassportDTO): Promise<boolean> {
    try {
      await this.userRepositry.delete({ passport_type, passport_id });
      return true;
    } catch {
      return false;
    }
  }
}
