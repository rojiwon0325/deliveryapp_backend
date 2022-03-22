import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';

@ApiTags('restaurant')
@Controller('menu')
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
