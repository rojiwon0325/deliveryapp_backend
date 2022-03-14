import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateDTO, ByIdDTO, ByPassportDTO, UpdateRole } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepositry: Repository<User>,
  ) {}

  async create(dto: CreateDTO): Promise<User | null> {
    try {
      const user = await this.userRepositry.save(
        this.userRepositry.create(dto),
      );
      return user;
    } catch {
      return null;
    }
  }
  async readById({ id }: ByIdDTO): Promise<User | null> {
    try {
      return this.userRepositry.findOne(id);
    } catch {
      return null;
    }
  }
  async readByPassport({
    passport_id,
    passport_type,
  }: ByPassportDTO): Promise<User | null> {
    try {
      return this.userRepositry.findOne({ passport_type, passport_id });
    } catch {
      return null;
    }
  }
  async updateRole({ id, role }: UpdateRole): Promise<User | null> {
    try {
      const user = await this.userRepositry.findOneOrFail({ id });
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
    passport_id,
    passport_type,
  }: ByPassportDTO): Promise<boolean> {
    try {
      await this.userRepositry.delete({ passport_id, passport_type });
      return true;
    } catch {
      return false;
    }
  }
}
