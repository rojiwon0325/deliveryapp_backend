import { PickType } from '@nestjs/swagger';
import { Restaurant } from './restaurant.entity';

export class CreateDTO extends PickType(Restaurant, [
  'name',
  'owner_id',
  'category_id',
  'sub_category_id',
  'brand_image',
  'background_image',
]) {}
