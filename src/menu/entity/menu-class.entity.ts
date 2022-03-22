import { CoreEntity } from '@common/common.entity';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class MenuClass extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  restaurant_id: number;

  @OneToMany(() => Menu, (menu) => menu.menu_class, { eager: true })
  menu: Menu[];
}
