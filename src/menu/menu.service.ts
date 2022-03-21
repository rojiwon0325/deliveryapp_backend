import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurant/restaurant.entity';
import { Repository } from 'typeorm';
import { MenuClass } from './entity/menu-class.entity';
import { MenuOptionClass } from './entity/menu-option-class.entity';
import { MenuOption } from './entity/menu-option.entity';
import { Menu } from './entity/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepositry: Repository<Menu>,
    @InjectRepository(MenuClass)
    private readonly menuClassRepositry: Repository<MenuClass>,
    @InjectRepository(MenuOption)
    private readonly menuOptionRepositry: Repository<MenuOption>,
    @InjectRepository(MenuOptionClass)
    private readonly menuOptionClassRepositry: Repository<MenuOptionClass>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findMyRestaurantId({ owner_id }) {
    try {
      const { id } = await this.restaurantRepository.findOneOrFail(
        { owner_id },
        { select: ['id'] },
      );
      return id;
    } catch (error) {
      return error;
    }
  }

  async createMenuClass({ owner_id, name }) {
    try {
      const restaurant_id = await this.findMyRestaurantId({ owner_id });
      const menuclass = await this.menuClassRepositry.save(
        this.menuClassRepositry.create({ name, restaurant_id }),
      );
      return menuclass;
    } catch {
      return null;
    }
  }
  async createMenu(
    { owner_id, menu_class_id },
    { name, price, price_name, description, cover_image },
  ) {
    try {
      const restaurant_id = await this.findMyRestaurantId({ owner_id });
      const menu_class = await this.menuClassRepositry.findOneOrFail({
        id: menu_class_id,
        restaurant_id,
      });
      const menu = await this.menuRepositry.save(
        this.menuRepositry.create({
          name,
          price,
          price_name,
          description,
          cover_image,
          menu_class,
        }),
      );
      return menu;
    } catch {
      return null;
    }
  }

  async createMenuOptionClass() {
    return null;
  }
  async createMenuOption() {
    return null;
  }

  async readyAllMenuClassByRestaurantId({ restaurant_id }) {
    try {
      const menuclass_list = await this.menuClassRepositry.find({
        restaurant_id,
      });
      return menuclass_list;
    } catch {
      return null;
    }
  }

  async readyMenuById({ id }) {
    try {
      const menu = await this.menuRepositry.findOne(
        { id },
        { relations: ['menu_option_class'] },
      );
      return menu;
    } catch {
      return null;
    }
  }

  async updateMenuClass() {
    try {
    } catch {
      return null;
    }
  }

  async updateMenu() {
    try {
    } catch {
      return null;
    }
  }

  async updateMenuOptionClass() {
    try {
    } catch {
      return null;
    }
  }

  async updateMenuOption() {
    try {
    } catch {
      return null;
    }
  }

  async deleteMenuClass() {
    try {
    } catch {
      return null;
    }
  }

  async deleteMenu() {
    try {
    } catch {
      return null;
    }
  }

  async deleteMenuOptionClass() {
    try {
    } catch {
      return null;
    }
  }

  async deleteMenuOption() {
    try {
    } catch {
      return null;
    }
  }
}
