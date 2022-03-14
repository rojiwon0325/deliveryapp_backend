import { Module } from '@nestjs/common';
import { PassportKakaoModule } from './passport-kakao/passport-kakao.module';
import { Routes } from '@nestjs/core';
import { PassportNaverModule } from './passport-naver/passport-naver.module';

@Module({
  imports: [PassportKakaoModule, PassportNaverModule],
})
export class AuthModule {}

export const children: Routes = [
  { path: 'kakao', module: PassportKakaoModule },
  { path: 'naver', module: PassportNaverModule },
];
