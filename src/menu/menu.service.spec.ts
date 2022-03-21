import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from '@restaurant/restaurant.entity';
import { Repository } from 'typeorm';
import { MenuClass } from './entity/menu-class.entity';
import { MenuOptionSelection } from './entity/menu-option-selection.entity';
import { MenuOption } from './entity/menu-option.entity';
import { Menu } from './entity/menu.entity';
import { MenuService } from './menu.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MenuService', () => {
  let service: MenuService;
  let menuRepository: MockRepository<Menu>;
  let menuClassRepository: MockRepository<MenuClass>;
  let restaurantRepository: MockRepository<Restaurant>;
  let optionRepository: MockRepository<MenuOption>;
  let selectionRepository: MockRepository<MenuOptionSelection>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        { provide: getRepositoryToken(Menu), useValue: mockRepository() },
        { provide: getRepositoryToken(MenuClass), useValue: mockRepository() },
        { provide: getRepositoryToken(Restaurant), useValue: mockRepository() },
        { provide: getRepositoryToken(MenuOption), useValue: mockRepository() },
        {
          provide: getRepositoryToken(MenuOptionSelection),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
    menuRepository = module.get(getRepositoryToken(Menu));
    menuClassRepository = module.get(getRepositoryToken(MenuClass));
    restaurantRepository = module.get(getRepositoryToken(Restaurant));
    optionRepository = module.get(getRepositoryToken(MenuOption));
    selectionRepository = module.get(getRepositoryToken(MenuOptionSelection));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMyRestaurantId', () => {
    it('식당 정보 조회', async () => {
      restaurantRepository.findOneOrFail.mockResolvedValue({ id: 10 });
      const result = await service.findMyRestaurantId({ owner_id: 1 });
      expect(result).toEqual(10);
    });
    it('식당 정보 실패', async () => {
      restaurantRepository.findOneOrFail.mockRejectedValue(
        new Error('test error'),
      );
      const result = await service.findMyRestaurantId({ owner_id: 1 });
      expect(result).toEqual(new Error('test error'));
    });
  });
  describe('createMenuClass', () => {
    // pass
  });
  describe('createMenu', () => {
    // pass
  });
  describe('createMenuOption', () => {
    // pass
  });
  describe('readyAllMenuClassByRestaurantId', () => {
    // pass
  });
  describe('readyMenuById', () => {
    // pass
  });
  describe('updateMenuClass', () => {
    // pass
  });
  describe('updateMenu', () => {
    // pass
  });
  describe('updateMenuOption', () => {
    // pass
  });
  describe('updateMenuOptionSelection', () => {
    // pass
  });
  describe('deleteMenuClass', () => {
    // pass
  });
  describe('deleteMenu', () => {
    // pass
  });
  describe('deleteMenuOption', () => {
    // pass
  });
  describe('deleteMenuOptionSelection', () => {
    // pass
  });
});
