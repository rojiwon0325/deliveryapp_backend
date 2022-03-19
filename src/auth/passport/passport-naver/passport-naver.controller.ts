import { AuthPayload } from '@auth/auth.dto';
import { PassportService } from '@auth/passport/passport.service';
import { Public } from '@common/public.decorator';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { PassportType } from '@user/user.entity';
import { Response } from 'express';

@ApiTags('passport')
@Controller()
export class PassportNaverController {
  constructor(private readonly passportService: PassportService) {}
  @Get()
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('naver'))
  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.passportService.login({
      passport_type: PassportType.Kakao,
      payload: req.user as AuthPayload,
      res,
    });
  }
}
