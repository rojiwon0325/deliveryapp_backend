import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

const mockRepository = () => ({
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
    it('카테고리 생성', async () => {
      // test
    });
    it('카테고리 생성 실패', async () => {
      // test
    });
  });
  describe('readAll', () => {
    it('카테고리 목록 조회', async () => {
      // test
    });
    it('카테고리 목록 조회 실패', async () => {
      // test
    });
  });
  describe('updateById', () => {
    it('카테고리 이름 변경', async () => {
      // test
    });
    it('카테고리 이미지 변경', async () => {
      // test
    });
    it('카테고리 조회 실패', async () => {
      // test
    });
    it('카테고리 변경 실패', async () => {
      // test
    });
  });
  describe('deleteById', () => {
    it('delete메소드 정상 실행', async () => {
      // test
    });
    it('delete메소드 실패', async () => {
      // test
    });
  });
});
