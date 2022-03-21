import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { MenuOption } from './menu-option.entity';

@Entity()
export class MenuOptionSelection extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  owner_id: number;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne(() => MenuOption, (option) => option.menu_option_selection, {
    onDelete: 'CASCADE',
  })
  menu_option: MenuOption;

  @RelationId((selection: MenuOptionSelection) => selection.menu_option)
  menu_option_id: number;
}
