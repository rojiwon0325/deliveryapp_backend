import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Kakao {
  @PrimaryColumn()
  kakao_id: number;

  @Column({ nullable: true })
  kakao_token?: string;

  @Column({ nullable: true })
  kakao_refreshtoken?: string;
}
