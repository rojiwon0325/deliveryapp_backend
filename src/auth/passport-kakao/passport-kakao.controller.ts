import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  async kakaoLoginCallback(@Req() req): Promise<{ access_token: string }> {
    return this.kakaoService.login(req.user as KakaoPayload);
  }
}
