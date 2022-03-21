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

  describe('createMyRestaurant', () => {
    const data = {
      owner_id: 1,
      name: 'testname',
      brand_image: 'test_image',
      background_image: 'test_background',
    };
    it('카테고리 지정없이 생성', async () => {
      repository.create.mockReturnValue({ ...data });
      repository.save.mockResolvedValue({ ...data, category_id: 1 });

      const result = await service.createMyRestaurant({ ...data });
      expect(result).toEqual({ ...data, category_id: 1 });
      expect(repository.save).toHaveBeenCalledWith({ ...data, category_id: 1 });
    });
    it('메인 카테고리만 지정하고 생성', async () => {
      const category_id = 10;
      repository.create.mockReturnValue({ ...data });
      repository.save.mockResolvedValue({ ...data, category_id });

      const result = await service.createMyRestaurant({ ...data, category_id });
      expect(result).toEqual({ ...data, category_id });
      expect(repository.save).toHaveBeenCalledWith({ ...data, category_id });
    });
    it('서브 카테고리만 지정하고 생성', async () => {
      const sub = 10;
      repository.create.mockReturnValue({ ...data });
      repository.save.mockResolvedValue({ ...data, category_id: sub });

      const result = await service.createMyRestaurant({
        ...data,
        sub_category_id: sub,
      });
      expect(result).toEqual({
        ...data,
        category_id: sub,
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...data,
        category_id: sub,
      });
    });
    it('두 카테고리가 동일하게 지정하고 생성', async () => {
      const category_id = 10;
      const sub_category_id = 10;
      repository.create.mockReturnValue({ ...data });
      repository.save.mockResolvedValue({ ...data, category_id });

      const result = await service.createMyRestaurant({
        ...data,
        category_id,
        sub_category_id,
      });
      expect(result).toEqual({ ...data, category_id });
      expect(repository.save).toHaveBeenCalledWith({ ...data, category_id });
    });
    it('두 카테고리가 다르게 지정하고 생성', async () => {
      const category = { category_id: 10, sub_category_id: 15 };
      repository.create.mockReturnValue({ ...data });
      repository.save.mockResolvedValue({ ...data, ...category });

      const result = await service.createMyRestaurant({ ...data, ...category });
      expect(result).toEqual({ ...data, ...category });
      expect(repository.save).toHaveBeenCalledWith({ ...data, ...category });
    });
    it('이미 식당을 소유한 경우 또는 예기치 못한 에러', async () => {
      repository.create.mockReturnValue({ ...data });
      repository.save.mockRejectedValue(new Error());

      const result = await service.createMyRestaurant({ ...data });
      expect(result).toEqual(null);
    });
  });
  describe('readById', () => {
    const arg = { id: 1 };
    it('식당 정보 조회 성공', async () => {
      repository.findOneOrFail.mockResolvedValue({ ...arg, active: true });
    });
    it('식당 정보 조회 실패', async () => {
      // 'pass'
    });
  });
  describe('readRestaurantListByCategoryId', () => {
    it('식당 정보 조회 성공', async () => {
      // 'pass'
    });
    it('잘못된 범위의 페이지 요청', async () => {
      // 'pass'
    });
    it('식당 정보 조회 실패', async () => {
      // 'pass'
    });
  });
  describe('readRestaurantListByName', () => {
    it('식당 리스트 조회 성공', async () => {
      // 'pass'
    });
    it('잘못된 범위의 페이지 요청', async () => {
      // 'pass'
    });
    it('식당 리스트 조회 실패', async () => {
      // 'pass'
    });
  });
  describe('updateMyRestaurant', () => {
    it('식당 정보 조회 실패', async () => {
      // 'pass'
    });
    it('다른 카테고리 변경', async () => {
      // 'pass'
    });
    it('동일한 카테고리 변경', async () => {
      // 'pass'
    });
    it('서브 카테고리 변경후 메인 카테고리와 중복', async () => {
      // 'pass'
    });
    it('식당 정보 변경', async () => {
      // 'pass'
    });
    it('예기치 못한 에러', async () => {
      // 'pass'
    });
  });
  describe('deleteById', () => {
    it('delete메소드 정상 실행', async () => {
      // 'pass'
    });
    it('delete메소드 실패', async () => {
      // 'pass'
    });
  });
});
