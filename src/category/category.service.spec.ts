import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

const mockRepository = () => ({
  find: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: MockRepository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getRepositoryToken(Category), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const category = { name: 'testname', cover_image: 'testimage' };
    it('카테고리 생성', async () => {
      repository.create.mockReturnValueOnce(category);
      repository.save.mockResolvedValue(category);
      const result = await service.create(category);
      expect(result).toEqual(category);
    });
    it('카테고리 생성 실패', async () => {
      repository.create.mockReturnValueOnce(category);
      repository.save.mockRejectedValue(category);
      const result = await service.create(category);
      expect(result).toEqual(null);
    });
  });
  describe('readAll', () => {
    it('카테고리 목록 조회', async () => {
      repository.find.mockResolvedValue([{ name: 'fake' }]);
      const result = await service.readAll();
      expect(result).toEqual([{ name: 'fake' }]);
    });
    it('카테고리 목록 조회 실패', async () => {
      repository.find.mockRejectedValue(new Error());
      const result = await service.readAll();
      expect(result).toEqual(null);
    });
  });
  describe('updateById', () => {
    const proto = {
      id: 1,
      name: 'oldname',
      cover_image: 'oldimage',
    };
    it('카테고리 이름 변경', async () => {
      repository.findOneOrFail.mockResolvedValue({
        ...proto,
      });
      repository.save.mockResolvedValue({
        ...proto,
        name: 'newname',
      });
      const result = await service.updateById({
        id: 1,
        name: 'newname',
      });
      expect(result).toEqual({
        ...proto,
        name: 'newname',
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...proto,
        name: 'newname',
      });
    });
    it('카테고리 이미지 변경', async () => {
      repository.findOneOrFail.mockResolvedValue({
        ...proto,
      });
      repository.save.mockResolvedValue({
        ...proto,
        cover_image: 'newimage',
      });
      const result = await service.updateById({
        id: 1,
        cover_image: 'newimage',
      });
      expect(result).toEqual({
        ...proto,
        cover_image: 'newimage',
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...proto,
        cover_image: 'newimage',
      });
    });
    it('카테고리 조회 실패', async () => {
      repository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.updateById({
        id: 1,
      });
      expect(result).toEqual(null);
      expect(repository.save).toHaveBeenCalledTimes(0);
    });
    it('카테고리 변경 실패', async () => {
      repository.findOneOrFail.mockResolvedValue({
        ...proto,
      });
      repository.save.mockRejectedValue(new Error());
      const result = await service.updateById({
        id: 1,
      });
      expect(result).toEqual(null);
    });
  });
  describe('deleteById', () => {
    it('delete메소드 정상 실행', async () => {
      repository.delete.mockResolvedValue(undefined);
      const result = await service.deleteById({ id: 1 });
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      repository.delete.mockRejectedValue(new Error());
      const result = await service.deleteById({ id: 1 });
      expect(result).toEqual(false);
    });
  });
});
