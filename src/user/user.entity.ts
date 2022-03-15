import { CoreEntity } from '@common/common.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  Undefined = 'Undefined',
  Customer = 'Customer',
  Owner = 'Owner',
  Rider = 'Rider',
  Admin = 'Admin',
}

export enum PassportType {
  Kakao = 'Kakao',
  Naver = 'Naver',
}

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: true, unique: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column()
  @IsString()
  username: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Undefined })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ type: 'enum', enum: PassportType })
  @IsEnum(PassportType)
  passport_type: PassportType;

  @Column()
  @IsString()
  passport_id: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  access_token?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  refresh_token?: string;
}
