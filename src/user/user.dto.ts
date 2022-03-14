import { PassportType, UserRole } from './user.entity';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class UserPartial {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;
}
export class ReadorCreateDTO {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  username: string;

  @IsEnum(PassportType)
  passport_type: PassportType;

  @IsString()
  passport_id: string;

  @IsString()
  access_token?: string;

  @IsString()
  refresh_token?: string;
}

export class ByIdDTO {
  @IsNumber()
  id: number;
}

export class ByPassportDTO {
  @IsEnum(PassportType)
  passport_type: PassportType;

  @IsString()
  passport_id: string;
}

export class UpdateRole {
  @IsNumber()
  id: number;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateRoleDTO {
  @IsEnum(UserRole)
  role: UserRole;
}
