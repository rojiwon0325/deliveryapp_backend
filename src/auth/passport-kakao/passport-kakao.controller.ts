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
import { KakaoPayload } from './passport-kakao.dto';
import { PassportKakaoService } from './passport-kakao.service';

@Controller()
export class PassportKakaoController {
  constructor(private readonly kakaoService: PassportKakaoService) {}
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('oauth')
  @HttpCode(200)
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.kakaoService.login(req.user as KakaoPayload, res);
  }
}
