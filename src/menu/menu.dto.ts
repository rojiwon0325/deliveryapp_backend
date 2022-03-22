import { IntersectionType, PickType } from '@nestjs/swagger';
import { Restaurant } from '@restaurant/restaurant.entity';
import { IsNumber, ValidateNested } from 'class-validator';
import { MenuClass } from './entity/menu-class.entity';
import { Menu } from './entity/menu.entity';

export class ByOwnerIdDTO extends PickType(Restaurant, ['owner_id'] as const) {}
export class ByIdDTO extends PickType(Restaurant, ['id'] as const) {}

export class MenuClassSelector {
  @IsNumber()
  owner_id: number;
  @IsNumber()
  menu_class_id: number;
}

export class MenuSelector {
  @IsNumber()
  owner_id: number;
  @IsNumber()
  menu_id: number;
}

export class MenuOptionSelector {
  @IsNumber()
  owner_id: number;
  @IsNumber()
  option_id: number;
}

export class MenuOptionSelectionSelector {
  @IsNumber()
  owner_id: number;
  @IsNumber()
  selection_id: number;
}
export class MenuData extends PickType(Menu, [
  'name',
  'price',
  'price_name',
  'description',
  'cover_image',
] as const) {}

export class CreateMenuClassDTO extends IntersectionType(
  ByOwnerIdDTO,
  PickType(MenuClass, ['name'] as const),
) {}

export class CreateMenuDTO {
  @ValidateNested()
  selector: MenuClassSelector;

  @ValidateNested()
  data: MenuData;
}

export class ByRestaurantId extends PickType(MenuClass, ['restaurant_id']) {}
