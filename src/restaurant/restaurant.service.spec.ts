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
      repository.findOneOrFail.mockResolvedValue(arg);
      const result = await service.readById(arg);
      expect(result).toEqual(arg);
    });
    it('식당 정보 조회 실패', async () => {
      repository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.readById(arg);
      expect(result).toEqual(null);
    });
  });
  describe('readByOwnerId', () => {
    const arg = { id: 1 };
    it('식당 정보 조회 성공', async () => {
      repository.findOneOrFail.mockResolvedValue(arg);
      const result = await service.readByOwnerId(arg);
      expect(result).toEqual(arg);
    });
    it('식당 정보 조회 실패', async () => {
      repository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.readByOwnerId(arg);
      expect(result).toEqual(null);
    });
  });
  describe('readRestaurantListByCategoryId', () => {
    it('식당 정보 조회 성공', async () => {
      const arg = { id: 1, page: 2, size: 10 };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByCategoryId(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 2,
      });
    });
    it('page, size 생략', async () => {
      const arg = { id: 1 };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByCategoryId(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 1,
      });
    });
    it('잘못된 범위의 페이지 요청', async () => {
      const arg = { id: 1, page: -2, size: 10 };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByCategoryId(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 1,
      });
    });
    it('식당 정보 조회 실패', async () => {
      const arg = { id: 1, page: 2, size: 10 };
      repository.findAndCount.mockRejectedValue(new Error());
      const result = await service.readRestaurantListByCategoryId(arg);
      expect(result).toEqual(null);
    });
  });
  describe('readRestaurantListByName', () => {
    it('식당 리스트 조회 성공', async () => {
      const arg = { name: 'testname', page: 2, size: 10 };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByName(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 2,
      });
    });
    it('page, size 생략', async () => {
      const arg = { name: 'testname' };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByName(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 1,
      });
    });
    it('잘못된 범위의 페이지 요청', async () => {
      const arg = { name: 'testname', page: -2, size: 10 };
      const data = [[], 100];
      repository.findAndCount.mockResolvedValue(data);
      const result = await service.readRestaurantListByName(arg);
      expect(result).toEqual({
        result: data[0],
        total: data[1],
        page: 1,
      });
    });
    it('식당 리스트 조회 실패', async () => {
      const arg = { name: 'testname', page: 2, size: 10 };
      repository.findAndCount.mockRejectedValue(new Error());
      const result = await service.readRestaurantListByName(arg);
      expect(result).toEqual(null);
    });
  });
  describe('updateMyRestaurant', () => {
    it('서로 다른 카테고리 변경', async () => {
      const arg = {
        id: 1,
        owner_id: 10,
        name: 'new',
        category_id: 5,
        sub_category_id: 6,
      };
      repository.findOneOrFail.mockResolvedValue({
        ...arg,
        name: 'old',
        category_id: 1,
        sub_category_id: null,
      });
      repository.save.mockResolvedValue({ ...arg });

      const result = await service.updateMyRestaurant({ ...arg });
      expect(result).toEqual({
        ...arg,
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...arg,
      });
    });
    it('서로 동일한 카테고리 변경', async () => {
      const arg = {
        id: 1,
        owner_id: 10,
        name: 'new',
        category_id: 5,
        sub_category_id: 5,
      };
      repository.findOneOrFail.mockResolvedValue({
        ...arg,
        name: 'old',
        category_id: 1,
        sub_category_id: null,
      });
      repository.save.mockResolvedValue({ ...arg, sub_category_id: null });

      const result = await service.updateMyRestaurant({ ...arg });
      expect(result).toEqual({ ...arg, sub_category_id: null });
      expect(repository.save).toHaveBeenCalledWith({
        ...arg,
        sub_category_id: null,
      });
    });
    it('서브 카테고리 변경후 메인 카테고리와 중복', async () => {
      const arg = {
        id: 1,
        owner_id: 10,
        name: 'new',
        sub_category_id: 5,
      };
      repository.findOneOrFail.mockResolvedValue({
        ...arg,
        name: 'old',
        category_id: 5,
        sub_category_id: null,
      });
      repository.save.mockResolvedValue({
        ...arg,
        category_id: 5,
        sub_category_id: null,
      });

      const result = await service.updateMyRestaurant({ ...arg });
      expect(result).toEqual({ ...arg, category_id: 5, sub_category_id: null });
      expect(repository.save).toHaveBeenCalledWith({
        ...arg,
        category_id: 5,
        sub_category_id: null,
      });
    });
    it('카테고리 변경 없이 식당 정보 변경', async () => {
      const arg = {
        id: 1,
        owner_id: 10,
        name: 'new',
      };
      repository.findOneOrFail.mockResolvedValue({
        ...arg,
        name: 'old',
        category_id: 1,
        sub_category_id: 2,
      });
      repository.save.mockResolvedValue({
        ...arg,
        category_id: 1,
        sub_category_id: 2,
      });

      const result = await service.updateMyRestaurant({
        ...arg,
      });
      expect(result).toEqual({ ...arg, category_id: 1, sub_category_id: 2 });
      expect(repository.save).toHaveBeenCalledWith({
        ...arg,
        category_id: 1,
        sub_category_id: 2,
      });
    });
    it('식당 정보 조회 실패 및 예기치 못한 에러', async () => {
      const arg = {
        id: 1,
        owner_id: 10,
        name: 'new',
      };
      repository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.updateMyRestaurant({ ...arg });
      expect(result).toEqual(null);
      expect(repository.save).toHaveBeenCalledTimes(0);
    });
  });
  describe('deleteById', () => {
    it('delete메소드 정상 실행', async () => {
      const arg = { id: 1 };
      repository.delete.mockResolvedValue(arg);
      const result = await service.deleteById(arg);
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      const arg = { id: 1 };
      repository.delete.mockRejectedValue(new Error());
      const result = await service.deleteById(arg);
      expect(result).toEqual(false);
    });
  });
});
