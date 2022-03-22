import { CoreEntity } from '@common/common.entity';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { MenuOptionSelection } from './menu-option-selection.entity';
import { Menu } from './menu.entity';

@Entity()
export class MenuOption extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  owner_id: number;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  multiple?: boolean;

  @ManyToOne(() => Menu, (menu) => menu.menu_option, {
    onDelete: 'CASCADE',
  })
  menu: Menu;

  @RelationId((option: MenuOption) => option.menu)
  menu_id: number;

  @OneToMany(() => MenuOptionSelection, (selection) => selection.menu_option, {
    eager: true,
  })
  menu_option_selection: MenuOptionSelection[];
}
