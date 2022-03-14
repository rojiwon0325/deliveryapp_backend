import { PassportType, UserRole } from './user.entity';

export class UserPartial {
  email?: string;
  username: string;
  role: UserRole;
}
export class ReadorCreateDTO {
  email?: string;
  username: string;
  passport_type: PassportType;
  passport_id: string;
  access_token?: string;
  refresh_token?: string;
}

export class ByIdDTO {
  id: number;
}

export class ByPassportDTO {
  passport_type: PassportType;
  passport_id: string;
}

export class UpdateRole {
  id: number;
  role: UserRole;
}
