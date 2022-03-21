import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ByIdDTO,
  CreateDTO,
  ListByIdDTO,
  ListByNameDTO,
  RestaurantListOutput,
  UpdateRestaurantDTO,
} from './restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepositry: Repository<Restaurant>,
  ) {}

  async createMyRestaurant({
    category_id,
    sub_category_id,
    ...rest
  }: CreateDTO): Promise<Restaurant | null> {
    try {
      const prototype = this.restaurantRepositry.create({ ...rest });
      if (category_id) {
        prototype.category_id = category_id;
        if (sub_category_id && category_id !== sub_category_id) {
          prototype.sub_category_id = sub_category_id;
        }
      } else if (sub_category_id) {
        prototype.category_id = sub_category_id;
      } else {
        prototype.category_id = 1;
      }
      const restaurant = await this.restaurantRepositry.save(prototype);

      return restaurant;
    } catch {
      return null;
    }
  }

  async readById({ id }: ByIdDTO): Promise<Restaurant | null> {
    try {
      const restaurant = await this.restaurantRepositry.findOneOrFail({
        id,
        activate: true,
      });
      return restaurant;
    } catch {
      return null;
    }
  }

  async readByOwnerId({ id }: ByIdDTO): Promise<Restaurant | null> {
    try {
      const restaurant = await this.restaurantRepositry.findOneOrFail({
        owner_id: id,
      });
      return restaurant;
    } catch {
      return null;
    }
  }

  async readRestaurantListByCategoryId({
    id,
    page: prepage,
    size,
  }: ListByIdDTO): Promise<RestaurantListOutput | null> {
    try {
      const take = size ?? 10;
      const page = prepage ?? 1 > 1 ? prepage - 1 : 0;
      const [result, total] = await this.restaurantRepositry.findAndCount({
        where: [
          { category_id: id, activate: true },
          { sub_category_id: id, activate: true },
        ],
        skip: take * page,
        take,
      });
      return { result, total, page: page + 1 };
    } catch {
      return null;
    }
  }

  async readRestaurantListByName({
    name,
    page: prepage,
    size,
  }: ListByNameDTO): Promise<RestaurantListOutput | null> {
    try {
      const take = size ?? 10;
      const page = prepage ?? 1 > 1 ? prepage - 1 : 0;
      const [result, total] = await this.restaurantRepositry.findAndCount({
        where: { name, activate: true },
        skip: take * page,
        take,
      });
      return { result, total, page: page + 1 };
    } catch {
      return null;
    }
  }

  async updateMyRestaurant({
    owner_id,
    category_id, // 정상적인 값이 온다고 가정
    sub_category_id, // 정상적인 값이 온다고 가정
    ...rest
  }: UpdateRestaurantDTO): Promise<Restaurant | null> {
    try {
      const prototype = await this.restaurantRepositry.findOneOrFail({
        owner_id,
      });

      if (category_id) prototype.category_id = category_id;
      if (sub_category_id) prototype.sub_category_id = sub_category_id;

      if (prototype.category_id === prototype.sub_category_id)
        prototype.sub_category_id = null;

      for (const [key, val] of Object.entries(rest)) {
        prototype[key] = val;
      }
      const restaurant = await this.restaurantRepositry.save(prototype);
      return restaurant;
    } catch {
      return null;
    }
  }

  async deleteById({ id }: ByIdDTO): Promise<boolean> {
    try {
      await this.restaurantRepositry.delete({ owner_id: id });
      return true;
    } catch {
      return false;
    }
  }
}
