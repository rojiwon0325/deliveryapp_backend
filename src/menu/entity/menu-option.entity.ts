import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { MenuOptionClass } from './menu-option-class.entity';

@Entity()
export class MenuOption extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne(() => MenuOptionClass, (optionclass) => optionclass.menu_option, {
    onDelete: 'CASCADE',
  })
  menu_option_class: MenuOptionClass;

  @RelationId((option: MenuOption) => option.menu_option_class)
  menu_optin_class_id: number;
}
