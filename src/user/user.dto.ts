import { User } from './user.entity';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CoreResult } from '@common/common.dto';
import { PickType } from '@nestjs/swagger';
export class UserPartial extends PickType(User, [
  'id',
  'email',
  'username',
  'role',
] as const) {}

export class UserPassport extends PickType(User, [
  'id',
  'passport_type',
  'passport_id',
  'access_token',
  'refresh_token',
] as const) {}
export class ReadorCreateDTO extends PickType(User, [
  'email',
  'username',
  'passport_type',
  'passport_id',
  'access_token',
  'refresh_token',
] as const) {}

export class FindUserIdParams {
  @IsNumber()
  userId: number;
}

export class ByIdDTO extends PickType(User, ['id'] as const) {}

export class ByPassportDTO extends PickType(User, [
  'passport_type',
  'passport_id',
] as const) {}

export class UpdateRole extends PickType(User, ['id', 'role'] as const) {}
export class UpdateRoleDTO extends PickType(User, ['role'] as const) {}

export class UserPartialResult extends CoreResult {
  @ValidateNested()
  @IsOptional()
  @Type(() => UserPartial)
  result?: UserPartial;
}
