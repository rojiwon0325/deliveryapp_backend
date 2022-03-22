import { PartialType, PickType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Restaurant } from './restaurant.entity';

export class CreateDTO extends PickType(Restaurant, [
  'name',
  'owner_id',
  'brand_image',
  'background_image',
  'category_id',
  'sub_category_id',
] as const) {}

export class ByIdDTO {
  @IsNumber()
  id: number;
}

export class ListByIdDTO {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  size?: number;

  @IsNumber()
  id: number;
}

export class ListByNameDTO {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  size?: number;

  @IsString()
  name: string;
}

export class UpdateRestaurantDTO extends PickType(PartialType(Restaurant), [
  'brand_image',
  'background_image',
  'name',
  'category_id',
  'sub_category_id',
] as const) {
  @IsNumber()
  owner_id: number;
}

export class RestaurantListOutput {
  @IsNumber()
  page: number;

  @IsNumber()
  total: number;

  @ValidateNested({ each: true })
  result: Restaurant[];
}
