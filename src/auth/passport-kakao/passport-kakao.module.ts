import { Module } from '@nestjs/common';
import { PassportKakaoStrategy } from './passport-kakao.strategy';
import { PassportKakaoController } from './passport-kakao.controller';
import { PassportKakaoService } from './passport-kakao.service';

@Module({
  providers: [PassportKakaoStrategy, PassportKakaoService],
  controllers: [PassportKakaoController],
})
export class PassportKakaoModule {}
