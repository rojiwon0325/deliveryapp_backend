import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadorCreateDTO } from './user.dto';
import { PassportType, User, UserRole } from './user.entity';
import { UserService } from './user.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readOrCreateByPassport', () => {
    const date = new Date();
    const arg: ReadorCreateDTO = {
      username: 'newname',
      passport_id: '1',
      passport_type: PassportType.Kakao,
    };
    const mockedUser: User = {
      id: 10,
      role: UserRole.Admin,
      createdAt: date,
      ...arg,
      username: 'oldname',
    };
    const mockedExist: User = {
      id: 12,
      role: UserRole.Admin,
      username: 'testexist',
      passport_id: '2',
      passport_type: PassportType.Kakao,
      createdAt: date,
    };
    const returedMockedUser: User = {
      ...mockedUser,
      ...arg,
    };
    const newUserArg = {
      id: 10,
      ...arg,
    };

    const mockedFindOne = (first: any, second: any) =>
      repository.findOne
        .mockResolvedValueOnce(first)
        .mockResolvedValueOnce(second);

    it('기존회원이며 이메일이 없는 경우', async () => {
      mockedFindOne(mockedUser, null);
      repository.save.mockResolvedValue(returedMockedUser);
      const result = await service.readOrCreateByPassport(arg);
      expect(result).toEqual({ sub: mockedUser.id, role: mockedUser.role });
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('기존 회원이며 이메일이 변경되지 않은 경우', async () => {
      mockedFindOne(
        { ...mockedUser, email: 'old@email' },
        { ...mockedUser, email: 'old@email' },
      );
      repository.save.mockResolvedValue({
        ...returedMockedUser,
        email: 'old@email',
      });
      const result = await service.readOrCreateByPassport(arg);
      expect(result).toEqual({ sub: mockedUser.id, role: mockedUser.role });
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('기존 회원이며 이메일이 변경되었고 해당 이메일이 사용중이지 않은 경우', async () => {
      mockedFindOne({ ...mockedUser, email: 'old@email' }, null);
      repository.save.mockResolvedValue({
        ...returedMockedUser,
        email: 'new@email',
      });
      const result = await service.readOrCreateByPassport({
        ...arg,
        email: 'new@email',
      });
      expect(result).toEqual({ sub: mockedUser.id, role: mockedUser.role });
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith({
        ...returedMockedUser,
        email: 'new@email',
      });
    });
    it('기존 회원이며 이메일이 변경되었고 해당 이메일이 사용중인 경우', async () => {
      mockedFindOne(
        { ...mockedUser, email: 'old@email' },
        { ...mockedExist, email: 'new@email' },
      );
      repository.save.mockResolvedValue({
        ...returedMockedUser,
        email: 'old@email',
      });
      const result = await service.readOrCreateByPassport({
        ...arg,
        email: 'new@email',
      });
      expect(result).toEqual({ sub: mockedUser.id, role: mockedUser.role });
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith({
        ...returedMockedUser,
        email: 'old@email',
      });
    });
    it('기존 회원이 아니며 이메일이 없는 경우', async () => {
      mockedFindOne(null, null);
      repository.save.mockResolvedValue({
        ...newUserArg,
        role: UserRole.Undefined,
      });
      repository.create.mockReturnValue({
        ...newUserArg,
        role: UserRole.Undefined,
      });
      const result = await service.readOrCreateByPassport(arg);
      expect(result).toEqual({ sub: newUserArg.id, role: UserRole.Undefined });
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(arg);
    });
    it('기존 회원이 아니며 이메일이 이미 사용중인 경우', async () => {
      mockedFindOne(null, mockedExist);
      const result = await service.readOrCreateByPassport(arg);
      expect(result).toEqual(false);
      expect(repository.save).toHaveBeenCalledTimes(0);
      expect(repository.create).toHaveBeenCalledTimes(0);
    });
    it('기존 회원이 아니며 이메일이 사용중이지 않은 경우', async () => {
      mockedFindOne(null, null);
      repository.save.mockResolvedValue({
        ...newUserArg,
        role: UserRole.Undefined,
      });
      repository.create.mockReturnValue({
        ...newUserArg,
        role: UserRole.Undefined,
      });
      const result = await service.readOrCreateByPassport({
        ...arg,
        email: 'test@email',
      });
      expect(result).toEqual({ sub: newUserArg.id, role: UserRole.Undefined });
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith({
        ...arg,
        email: 'test@email',
      });
    });
    it('예기치 못한 에러', async () => {
      mockedFindOne(null, null);
      repository.save.mockRejectedValue(new Error());
      repository.create.mockReturnValue({
        ...newUserArg,
        role: UserRole.Undefined,
      });
      const result = await service.readOrCreateByPassport(arg);
      expect(result).toEqual(null);
    });
  });
  //describe('readById', () => {});
  //describe('readPassportById', () => {});
  //describe('updateRole', () => {});
  //describe('deleteById', () => {});
  //describe('deleteByPassport', () => {});
});
