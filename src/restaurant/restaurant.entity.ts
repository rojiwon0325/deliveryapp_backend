import { CoreEntity } from '@common/common.entity';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Restaurant extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  background_image: string;

  @Column()
  @IsUrl()
  brand_image: string;

  @Column({ unique: true }) // 한 계정당 하나만 등록 가능
  @IsNumber()
  owner_id: number;

  @Column({ default: 1 }) // 1 is 기타
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  sub_category_id?: number;

  @Column({ default: false })
  @IsBoolean()
  activate: boolean;
  // 주소 추가후 활성화 가능 -> 주소는 unique
  // 활성화 후 메뉴 추가 가능
  // 비활성화된 가게는 점주에게만 노출
}
