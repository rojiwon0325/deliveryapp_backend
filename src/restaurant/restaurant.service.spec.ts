import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: MockRepository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        { provide: getRepositoryToken(Restaurant), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRestaurant', () => {
    it('카테고리 지정없이 생성', async () => {});
    it('메인 카테고리만 지정하고 생성', async () => {});
    it('서브 카테고리만 지정하고 생성', async () => {});
    it('두 카테고리가 동일하게 지정하고 생성', async () => {});
    it('두 카테고리가 다르게 지정하고 생성', async () => {});
    it('이미 식당을 소유한 경우', async () => {});
    it('예기치 못한 에러', async () => {});
  });
  describe('readRestaurantById', () => {
    it('식당 정보 조회 성공', async () => {});
    it('식당 정보 조회 실패', async () => {});
  });
  describe('readRestaurantListByCategoryId', () => {
    it('식당 정보 조회 성공', async () => {});
    it('잘못된 범위의 페이지 요청', async () => {});
    it('식당 정보 조회 실패', async () => {});
  });
  describe('readRestaurantListByName', () => {
    it('식당 리스트 조회 성공', async () => {});
    it('잘못된 범위의 페이지 요청', async () => {});
    it('식당 리스트 조회 실패', async () => {});
  });
  describe('updateRestaurant', () => {
    it('식당 정보 조회 실패', async () => {});
    it('다른 카테고리 변경', async () => {});
    it('동일한 카테고리 변경', async () => {});
    it('서브 카테고리 변경후 메인 카테고리와 중복', async () => {});
    it('식당 정보 변경', async () => {});
    it('예기치 못한 에러', async () => {});
  });
  describe('deleteRestaurant', () => {
    it('delete메소드 정상 실행', async () => {});
    it('delete메소드 실패', async () => {});
  });
});
