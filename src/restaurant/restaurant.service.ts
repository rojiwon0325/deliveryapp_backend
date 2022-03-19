import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDTO } from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepositry: Repository<Restaurant>,
  ) {}

  async createRestaurant({ sub_category_id, category_id, ...rest }: CreateDTO) {
    try {
      const prototype = this.restaurantRepositry.create({
        ...rest,
      });
      if (category_id) {
        prototype.category_id = category_id;
        if (category_id !== sub_category_id) {
          prototype.sub_category_id = sub_category_id;
        }
      } else if (sub_category_id) {
        prototype.category_id = sub_category_id;
      }
      const restaurant = await this.restaurantRepositry.save(prototype);

      return restaurant;
    } catch {
      return null;
    }
  }

  readRestaurantById() {
    return null;
  }

  readMyRestaurant() {
    return null;
  }

  readRestaurantListByCategoryId() {
    return null;
  }

  readRestaurantListByName() {
    return null;
  }

  updateRestaurant() {
    return null;
  }

  deleteRestaurant() {
    return null;
  }
}
