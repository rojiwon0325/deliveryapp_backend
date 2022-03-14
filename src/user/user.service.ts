import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ByIdDTO,
  ByPassportDTO,
  ReadorCreateDTO,
  UpdateRole,
  UserPartial,
} from './user.dto';
import { JwtPayload } from '@jwt/jwt.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepositry: Repository<User>,
  ) {}

  async readOrCreateByPassport({
    passport_type,
    passport_id,
    ...rest
  }: ReadorCreateDTO): Promise<JwtPayload | null> {
    try {
      const user = await this.userRepositry.findOne({
        passport_type,
        passport_id,
      });
      if (user) {
        for (const [key, val] of Object.entries(rest)) user[key] = val;
        const { id, username } = await this.userRepositry.save(user);
        return { sub: id, username };
      }
      const { id, username } = await this.userRepositry.save(
        this.userRepositry.create({ ...rest, passport_type, passport_id }),
      );
      return { sub: id, username };
    } catch {
      return null;
    }
  }

  async readById({ id }: ByIdDTO): Promise<UserPartial | null> {
    try {
      return this.userRepositry.findOne(
        { id },
        { select: ['email', 'username', 'role'] },
      );
    } catch {
      return null;
    }
  }

  async updateRole({ id, role }: UpdateRole): Promise<UserPartial | null> {
    try {
      const user = await this.userRepositry.findOneOrFail(
        { id },
        { select: ['email', 'username', 'role'] },
      );
      user.role = role;
      await this.userRepositry.save(user);
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
