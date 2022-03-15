import { Roles } from '@common/role.decorator';
import { JwtPayload } from '@jwt/jwt.dto';
import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FindUserIdParams, UpdateRoleDTO, UserPartialResult } from './user.dto';
import { UserRole } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMyUser(
    @Req() { user }: { user: JwtPayload },
  ): Promise<UserPartialResult> {
    const result = await this.userService.readById({ id: user?.sub });
    if (result) {
      return { ok: true, result };
    }
    return { ok: false, error: '사용자 정보를 불러오지 못했습니다.' };
  }

  @Post()
  @ApiQuery({
    name: 'role',
    enum: [UserRole.Customer, UserRole.Owner, UserRole.Rider],
  })
  @Roles(UserRole.Undefined)
  async updateRole(
    @Req() { user }: { user: JwtPayload },
    @Res() res: Response,
    @Query() { role }: UpdateRoleDTO,
  ): Promise<UserPartialResult> {
    const result = await this.userService.updateRole(
      {
        id: user?.sub,
        role,
      },
      res.clearCookie, // 성공시 호출
    );
    if (result) {
      return { ok: true, result };
    }
    return { ok: false, error: '사용자 정보를 업데이트하지 못했습니다.' };
  }

  @Get(':id')
  async getUser(
    @Param() { userId: id }: FindUserIdParams,
  ): Promise<UserPartialResult> {
    const result = await this.userService.readById({ id });
    if (result) {
      return { ok: true, result };
    }
    return { ok: false, error: '사용자 정보를 불러오지 못했습니다.' };
  }
}
