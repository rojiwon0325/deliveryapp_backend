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
export class PassportKakaoController {
  constructor(private readonly passportService: PassportService) {}
  @Get()
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.passportService.login({
      passport_type: PassportType.Kakao,
      payload: req.user as AuthPayload,
      res,
    });
  }

  @Get('oauth/logout')
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogoutCallback() {
    //  @Res({ passthrough: true }) res: Response, //  @Req() req: any,
    return { ok: true };
  }

  // https만 허용함
  /*
  @Get('leave')
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLeaveCallback() {
    return null;
  }
  */
}
