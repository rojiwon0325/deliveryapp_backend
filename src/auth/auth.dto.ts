export class JwtPayload {
  sub: string;
  username: string;
}

export class KakaoPayload {
  username: string;
  kakaoId: string;
  email: string | null;
}
