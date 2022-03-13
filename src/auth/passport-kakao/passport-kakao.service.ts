import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { KakaoPayload } from './passport-kakao.dto';

@Injectable()
export class PassportKakaoService {
  constructor(private readonly jwtService: JwtService) {}
  login(payload: KakaoPayload) {
    // kakao passport를 통해 얻어온 정보를 통해 유저를 찾아
    // jwt 토큰을 발급하여 로그인
    // 리턴이 아닌 쿠키 해더를 통해 전달
    const token = this.jwtService.sign({
      sub: payload.kakaoId,
      username: payload.username,
    });
    console.log(token);
    return { access_token: payload.username };
  }
  logout() {
    return null;
  }
  withdrawal() {
    return null;
  }
}
