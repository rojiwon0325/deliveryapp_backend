import { CoreEntity } from '@common/common.entity';
import { IsString, IsUrl } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  cover_image: string;
}
