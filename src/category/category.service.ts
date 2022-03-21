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

  async create({ name, cover_image }: CreateDTO): Promise<Category | null> {
    try {
      const category = await this.categoryRepositry.save(
        this.categoryRepositry.create({ name, cover_image }),
      );
      return category;
    } catch {
      return null;
    }
  }
  async readAll(): Promise<Category[] | null> {
    try {
      const list = await this.categoryRepositry.find();
      return list;
    } catch {
      return null;
    }
  }
  async updateById({
    id,
    name,
    cover_image,
  }: UpdateDTO): Promise<Category | null> {
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
  async deleteById({ id }: ByIdDTO): Promise<boolean> {
    try {
      await this.categoryRepositry.delete({ id });
      return true;
    } catch {
      return false;
    }
  }
}
