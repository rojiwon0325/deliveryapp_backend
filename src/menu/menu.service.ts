import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurant/restaurant.entity';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepositry: Repository<Menu>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepositry: Repository<Restaurant>,
  ) {}

  async create() {
    return null;
  }

  async readAll() {
    //옵션 정보 미포함
    return null;
  }

  async readById() {
    // 옵션 정보 포함
    return null;
  }
}
