import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportKakaoModule } from './passport/passport-kakao/passport-kakao.module';
import { Routes } from '@nestjs/core';
import { PassportNaverModule } from './passport/passport-naver/passport-naver.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportKakaoModule, PassportNaverModule, HttpModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

export const children: Routes = [
  { path: 'kakao', module: PassportKakaoModule },
  { path: 'naver', module: PassportNaverModule },
];
