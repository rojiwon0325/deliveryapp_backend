import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { KakaoPayload } from './passport-kakao.dto';

@Injectable()
export class PassportKakaoService {
  constructor(private readonly jwtService: JwtService) {}
  login({ id, username }: KakaoPayload, res: Response) {
    // UserService를 통한 유저 확인 및 access_token db저장로직 필요
    // 인증 실패화면 구현 필요

    const token = this.jwtService.sign({
      sub: id,
      username: username,
    });
    res.cookie('jwt', token, { httpOnly: true });
    return res.redirect('http://localhost:3000');
  }
  logout() {
    return null;
  }
  withdrawal() {
    return null;
  }
}
