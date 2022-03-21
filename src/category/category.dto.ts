import { PickType } from '@nestjs/swagger';
import { Category } from './category.entity';

export class CreateDTO extends PickType(Category, ['name', 'cover_image']) {}

export class UpdateDTO extends PickType(Category, [
  'id',
  'name',
  'cover_image',
]) {}

export class ByIdDTO extends PickType(Category, ['id']) {}
