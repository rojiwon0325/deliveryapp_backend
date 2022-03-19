import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
/*
import { UserService } from '@user/user.service';
import { HttpService } from '@nestjs/axios';
import { PassportType } from '@user/user.entity';
import { LogoutDTO } from './auth.dto';
*/

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async logout({ res }: { res: Response }) {
    // passport서버에서 토큰을 만료시키고 db에서 토큰을 모두 제거하는 과정이 필요함
    res.clearCookie('jwt');
    return res.redirect('http://localhost:3000/login');
  }
  /*
  async kakaoLogout({ access_token }: { access_token: string }) {
    return this.httpService.post('https://kapi.kakao.com/v1/user/logout', {
      headers: {
        Authorization: access_token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async logout({ id }: LogoutDTO) {
    try {
      const user = await this.userService.readPassportById({ id });
      if (user === null) {
        return null;
      }
      if (user.passport_type === PassportType.Kakao) {
        return this.kakaoLogout({ access_token: user.access_token });
      } else if (user.passport_type === PassportType.Naver) {
      }
    } catch {}
    return null;
  }

  leave() {
    return null;
  }
  */
}
