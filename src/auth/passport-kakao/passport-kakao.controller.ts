import { AuthPayload } from '@auth/auth.dto';
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
import { Response } from 'express';
import { PassportKakaoService } from './passport-kakao.service';

@Controller()
export class PassportKakaoController {
  constructor(private readonly kakaoService: PassportKakaoService) {}
  @Get()
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @Public()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.kakaoService.login(req.user as AuthPayload, res);
  }
}
