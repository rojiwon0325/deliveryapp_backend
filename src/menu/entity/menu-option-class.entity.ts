import { CoreEntity } from '@common/common.entity';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MenuOption } from './menu-option.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuOptionClass extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  multiple?: boolean;

  @ManyToOne(() => Menu, (menuclass) => menuclass.menu_option_class, {
    onDelete: 'CASCADE',
  })
  menu: Menu;

  @RelationId((optionclass: MenuOptionClass) => optionclass.menu)
  menu_id: number;

  @OneToMany(() => MenuOption, (option) => option.menu_option_class, {
    eager: true,
  })
  menu_option: MenuOption[];
}
