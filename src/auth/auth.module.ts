import { Module } from '@nestjs/common';
import { PassportKakaoModule } from './passport-kakao/passport-kakao.module';
import { Routes } from '@nestjs/core';

@Module({
  imports: [PassportKakaoModule],
})
export class AuthModule {}

export const children: Routes = [
  { path: 'kakao', module: PassportKakaoModule },
];
