import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuClass } from './entity/menu-class.entity';
import { Menu } from './entity/menu.entity';
import { Restaurant } from '@restaurant/restaurant.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuOption } from './entity/menu-option.entity';
import { MenuOptionSelection } from './entity/menu-option-selection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu,
      MenuClass,
      MenuOption,
      MenuOptionSelection,
      Restaurant,
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
