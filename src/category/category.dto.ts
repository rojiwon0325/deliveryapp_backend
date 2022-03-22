import { PartialType, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Category } from './category.entity';

export class CreateDTO extends PickType(Category, ['name', 'cover_image']) {}

export class UpdateDTO extends PickType(PartialType(Category), [
  'name',
  'cover_image',
] as const) {
  @IsNumber()
  id: number;
}

export class ByIdDTO extends PickType(Category, ['id'] as const) {}
