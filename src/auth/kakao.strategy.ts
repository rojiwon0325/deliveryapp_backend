import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoPayload } from './auth.dto';

export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      callbackURL: process.env.KAKAO_REDIRECT_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakao_account = profileJson.kakao_account;
    const payload: KakaoPayload = {
      kakaoId: profileJson.id,
      username: kakao_account.profile.nickname,
      email: kakao_account.email ?? null,
    };
    done(null, payload);
  }
}
