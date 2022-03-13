import { CoreEntity } from '@common/common.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  Undefined = 'Undefined',
  Customer = 'Customer',
  Owner = 'Owner',
  Rider = 'Rider',
  Admin = 'Admin',
}

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: true })
  email?: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column()
  kakao_id: number;

  @Column({ nullable: true })
  kakao_token?: string;

  @Column({ nullable: true })
  kakao_refreshtoken?: string;
}
