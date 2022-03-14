import { PassportType, UserRole } from './entity/user.entity';

export class CreateDTO {
  email?: string;
  username: string;
  passport_type: PassportType;
  passport_id: number;
}

export class ByIdDTO {
  id: number;
}
export class ByPassportDTO {
  passport_type: PassportType;
  passport_id: number;
}

export class UpdateRole {
  id: number;
  role: UserRole;
}
