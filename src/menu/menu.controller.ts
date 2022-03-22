import { Public } from '@common/public.decorator';
import { Roles } from '@common/role.decorator';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@user/user.entity';
import { MenuService } from './menu.service';

@ApiTags('restaurant')
@Controller('menu')
@Roles(UserRole.Owner)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('class')
  readAllMenuClass() {
    return null;
  }

  @Post('class')
  createMenuClass() {
    return null;
  }

  @Post('class/:menu_class_id/update')
  updateMenuClass() {
    return null;
  }

  @Post('class/:menu_class_id/delete')
  deleteMenuClass() {
    return null;
  }

  @Post('option')
  createMenuOption() {
    return null;
  }

  @Post('option/:option_id/update')
  updateMenuOption() {
    return null;
  }

  @Post('option/:option_id/delete')
  deleteMenuOption() {
    return null;
  }

  @Get(':menu_id')
  @Public()
  readMenu() {
    return null;
  }

  @Post()
  createMenu() {
    return null;
  }

  @Post(':menu_id/update')
  updateMenu() {
    return null;
  }

  @Post(':menu_id/delete')
  delete() {
    return null;
  }
}
