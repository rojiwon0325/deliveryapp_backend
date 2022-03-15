import { PassportLoginDTO } from '@auth/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

@Injectable()
export class PassportService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login({ passport_type, payload, res }: PassportLoginDTO) {
    try {
      const jwtpayload = await this.userService.readOrCreateByPassport({
        passport_type,
        ...payload,
      });
      if (jwtpayload === false) {
        // email이 이미 사용중이므로 passport 데이터를 삭제해야 함.
        return res.redirect('http://localhost:3000/auth/fail'); // 현재 이메일이 사용줌일을 알리는 다른 경로로 수정할 것
      }
      const token = this.jwtService.sign(jwtpayload);
      res.cookie('jwt', token, { httpOnly: true });
      return res.redirect('http://localhost:3000');
    } catch {
      return res.redirect('http://localhost:3000/auth/fail'); // 예기치 못한 에러
    }
  }
  logout() {
    return null;
  }
  withdrawal() {
    return null;
  }
}
