import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuClass } from './entity/menu-class.entity';
import { MenuOptionClass } from './entity/menu-option-class.entity';
import { MenuOption } from './entity/menu-option.entity';
import { Menu } from './entity/menu.entity';
import { Restaurant } from '@restaurant/restaurant.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu,
      MenuClass,
      MenuOption,
      MenuOptionClass,
      Restaurant,
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
