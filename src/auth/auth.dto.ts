import { PassportType } from '@user/user.entity';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CookieOptions, Response } from 'express';

export class AuthPayload {
  @IsString()
  passport_id: string;

  @IsString()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsString()
  @IsOptional()
  access_token: string | null;

  @IsString()
  @IsOptional()
  refresh_token: string | null;
}

export class PassportLoginDTO {
  @IsEnum(PassportType)
  passport_type: PassportType;

  @ValidateNested()
  payload: AuthPayload;
  res: Response;
}

export class LogoutDTO {
  id: number;
}

export class LogoutCallbackDTO {
  clearCookie: (
    name: string,
    options?: CookieOptions,
  ) => Response<any, Record<string, any>>;
}
