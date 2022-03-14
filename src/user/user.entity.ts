import { CoreEntity } from '@common/common.entity';
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
  @Column({ nullable: true })
  email?: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Undefined })
  role: UserRole;

  @Column({ type: 'enum', enum: PassportType })
  passport_type: PassportType;

  @Column()
  passport_id: string;

  @Column({ nullable: true })
  access_token?: string;

  @Column({ nullable: true })
  refresh_token?: string;
}
