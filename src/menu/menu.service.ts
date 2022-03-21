import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurant/restaurant.entity';
import { Repository } from 'typeorm';
import { MenuClass } from './entity/menu-class.entity';
import { MenuOptionSelection } from './entity/menu-option-selection.entity';
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
    private readonly optionRepositry: Repository<MenuOption>,
    @InjectRepository(MenuOptionSelection)
    private readonly selectionRepositry: Repository<MenuOptionSelection>,
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
          owner_id,
        }),
      );
      return menu;
    } catch {
      return null;
    }
  }

  async createMenuOption() {
    return null;
  }
  async createMenuOptionSelection() {
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

  async updateMenuOption() {
    try {
    } catch {
      return null;
    }
  }

  async updateMenuOptionSelection() {
    try {
    } catch {
      return null;
    }
  }

  async deleteMenuClass({ owner_id, menu_class_id }) {
    try {
      const restaurant_id = await this.findMyRestaurantId({ owner_id });
      await this.menuClassRepositry.delete({
        id: menu_class_id,
        restaurant_id,
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteMenu({ owner_id, menu_id }) {
    try {
      await this.menuRepositry.delete({
        id: menu_id,
        owner_id,
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteMenuOption({ owner_id, option_id }) {
    try {
      await this.optionRepositry.delete({
        id: option_id,
        owner_id,
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteMenuOptionSelection({ owner_id, selection_id }) {
    try {
      await this.selectionRepositry.delete({
        id: selection_id,
        owner_id,
      });
      return true;
    } catch {
      return false;
    }
  }
}
