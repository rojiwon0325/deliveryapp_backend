import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsString, IsUrl } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Menu extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  cover_image: string;

  @Column()
  @IsNumber()
  restaurant_id: number;
}
