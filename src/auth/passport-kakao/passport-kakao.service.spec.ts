import { Test, TestingModule } from '@nestjs/testing';
import { PassportKakaoService } from './passport-kakao.service';

describe('PassportKakaoService', () => {
  let service: PassportKakaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportKakaoService],
    }).compile();

    service = module.get<PassportKakaoService>(PassportKakaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
