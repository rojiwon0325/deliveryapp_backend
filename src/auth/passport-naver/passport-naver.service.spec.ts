import { Test, TestingModule } from '@nestjs/testing';
import { PassportNaverService } from './passport-naver.service';

describe('PassportNaverService', () => {
  let service: PassportNaverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportNaverService],
    }).compile();

    service = module.get<PassportNaverService>(PassportNaverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
