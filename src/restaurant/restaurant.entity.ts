import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Restaurant extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsUrl()
  background_image: string;

  @Column()
  @IsUrl()
  brand_image: string;

  @Column({ unique: true }) // 한 계정당 하나만 등록 가능
  @IsNumber()
  owner_id: number;
}