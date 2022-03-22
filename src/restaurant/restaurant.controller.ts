import { Roles } from '@common/role.decorator';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@user/user.entity';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @Roles(UserRole.Owner)
  readMyRestaurant() {
    return null;
  }

  @Post()
  @Roles(UserRole.Owner)
  createRestaurant() {
    return null;
  }

  @Post('update')
  @Roles(UserRole.Owner)
  updateRestaurant() {
    return null;
  }

  @Post('delete')
  @Roles(UserRole.Owner)
  deleteRestaurant() {
    return null;
  }
}
