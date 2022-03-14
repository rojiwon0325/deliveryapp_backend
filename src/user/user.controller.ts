import { Public } from '@common/public.decorator';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UpdateRoleDTO, UserPartial } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  WhoAmI(
    @Req() { user }: { user: { id: number; username: string } },
  ): Promise<UserPartial | null> {
    return this.userService.readById({ id: user?.id });
  }

  @Get(':userId')
  @Public()
  getUser(@Param('userId') id: number): Promise<UserPartial | null> {
    return this.userService.readById({ id });
  }

  @Post()
  updateRole(@Req() req, @Body() { role }: UpdateRoleDTO) {
    return this.userService.updateRole({ id: req.user.id, role });
  }
}
