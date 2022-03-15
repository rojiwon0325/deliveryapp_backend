import { UserRole } from '@user/user.entity';
import { IsEnum, IsNumber } from 'class-validator';

export class JwtPayload {
  @IsNumber()
  sub: number;

  @IsEnum(UserRole)
  role: UserRole;
}
