import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MenuClass } from './menu-class.entity';
import { MenuOptionClass } from './menu-option-class.entity';

@Entity()
export class Menu extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  cover_image: string;

  @Column()
  @IsString()
  @IsOptional()
  price_name?: string;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsString()
  description: string;

  @ManyToOne(() => MenuClass, (menuclass) => menuclass.menu, {
    onDelete: 'CASCADE',
  })
  menu_class: MenuClass;

  @RelationId((menu: Menu) => menu.menu_class)
  menu_class_id: number;

  @OneToMany(() => MenuOptionClass, (optionclass) => optionclass.menu)
  menu_option_class: MenuOptionClass[];
}
