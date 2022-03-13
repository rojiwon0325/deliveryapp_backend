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
}

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: true })
  email?: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: PassportType })
  passport_type: PassportType;

  @Column({ nullable: true })
  passport_id?: number;
}
