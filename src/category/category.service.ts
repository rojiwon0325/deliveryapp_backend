import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ByIdDTO, CreateDTO, UpdateDTO } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,
  ) {}

  async create({ name, cover_image }: CreateDTO) {
    try {
      const category = await this.categoryRepositry.save(
        this.categoryRepositry.create({ name, cover_image }),
      );
      return category;
    } catch {
      return null;
    }
  }
  async readAll() {
    try {
      const list = await this.categoryRepositry.find();
      return list;
    } catch {
      return [];
    }
  }
  async updateById({ id, name, cover_image }: UpdateDTO) {
    try {
      const prototype = await this.categoryRepositry.findOneOrFail({ id });
      if (name) {
        prototype.name = name;
      }
      if (cover_image) {
        prototype.cover_image = cover_image;
      }
      const category = await this.categoryRepositry.save(prototype);
      return category;
    } catch {
      return null;
    }
  }
  async deleteById({ id }: ByIdDTO) {
    try {
      await this.categoryRepositry.delete({ id });
      return true;
    } catch {
      return false;
    }
  }
}
