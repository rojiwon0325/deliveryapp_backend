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
  find: jest.fn(),
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
      try {
        await service.findMyRestaurantId({ owner_id: 1 });
        expect(true).toBe(false); // 실행되면 무조건 실패
      } catch (error) {
        expect(error).toEqual(new Error('Restaurant Not Found'));
      }
    });
  });
  describe('createMenuClass', () => {
    it('식당 조회 실패', async () => {
      jest.spyOn(service, 'findMyRestaurantId').mockRejectedValue(new Error());
      const result = await service.createMenuClass({
        owner_id: 10,
        name: 'test',
      });
      expect(result).toEqual(null);
      expect(menuClassRepository.save).toHaveBeenCalledTimes(0);
    });
    it('메뉴 클래스 생성', async () => {
      jest.spyOn(service, 'findMyRestaurantId').mockResolvedValue(1);
      menuClassRepository.create.mockReturnValue({
        name: 'test',
        restaurant_id: 1,
      });
      menuClassRepository.save.mockResolvedValue({
        name: 'test',
        restaurant_id: 1,
      });
      const result = await service.createMenuClass({
        owner_id: 10,
        name: 'test',
      });
      expect(result).toEqual({
        name: 'test',
        restaurant_id: 1,
      });
    });
    it('예기치 못한 에러', async () => {
      jest.spyOn(service, 'findMyRestaurantId').mockResolvedValue(1);
      menuClassRepository.create.mockReturnValue({
        name: 'test',
        restaurant_id: 1,
      });
      menuClassRepository.save.mockRejectedValue(new Error());
      const result = await service.createMenuClass({
        owner_id: 10,
        name: 'test',
      });
      expect(result).toEqual(null);
    });
  });
  const mockFn = () =>
    jest.spyOn(service, 'findMyRestaurantId').mockResolvedValue(1);
  describe('createMenu', () => {
    const arg = {
      selector: { owner_id: 1, menu_class_id: 2 },
      data: {
        name: 'testmenu',
        price: 1000,
        description: '',
        cover_image: '',
      },
    };
    it('메뉴 클래스 조회 실패', async () => {
      mockFn();
      menuClassRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.createMenu(arg);
      expect(result).toEqual(null);
      expect(menuRepository.save).toHaveBeenCalledTimes(0);
    });
    it('메뉴 생성', async () => {
      const menu = {
        ...arg.data,
        owner_id: arg.selector.owner_id,
        menu_class: { name: 'testmenuclass' },
      };
      mockFn();
      menuClassRepository.findOneOrFail.mockResolvedValue({
        name: 'testmenuclass',
      });
      menuRepository.create.mockReturnValueOnce(menu);
      menuRepository.save.mockResolvedValue(menu);
      const result = await service.createMenu(arg);
      expect(result).toEqual(menu);
      expect(menuRepository.create).toHaveBeenCalledWith(menu);
    });
    it('예기치 못한 에러', async () => {
      const menu = {
        ...arg.data,
        menu_class: { name: 'testmenuclass' },
      };
      mockFn();
      menuClassRepository.findOneOrFail.mockResolvedValue({
        name: 'testmenuclass',
      });
      menuRepository.create.mockReturnValueOnce(menu);
      menuRepository.save.mockRejectedValue(new Error());
      const result = await service.createMenu(arg);
      expect(result).toEqual(null);
    });
  });
  describe('createMenuOption', () => {
    // pass
  });
  describe('createMenuOptionSelection', () => {
    // pass
  });
  describe('readyAllMenuClassByRestaurantId', () => {
    const arg = {
      restaurant_id: 1,
    };
    it('메뉴 클래스 목록 조회', async () => {
      menuClassRepository.find.mockResolvedValue([{ name: 'fake' }]);
      const result = await service.readyAllMenuClassByRestaurantId(arg);
      expect(result).toEqual([{ name: 'fake' }]);
    });
    it('메뉴 클래스 목록 조회 실패', async () => {
      menuClassRepository.find.mockRejectedValue(new Error());
      const result = await service.readyAllMenuClassByRestaurantId(arg);
      expect(result).toEqual(null);
    });
  });
  describe('readyMenuById', () => {
    const arg = { id: 1 };
    it('메뉴 상세 조회', async () => {
      menuRepository.findOneOrFail.mockResolvedValue({ name: 'testmenu' });
      const result = await service.readyMenuById(arg);
      expect(result).toEqual({ name: 'testmenu' });
    });
    it('메뉴 상세 조회 실패', async () => {
      menuRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.readyMenuById(arg);
      expect(result).toEqual(null);
    });
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
    const arg = { owner_id: 1, menu_class_id: 2 };
    it('delete메소드 정상 실행', async () => {
      mockFn();
      menuClassRepository.delete.mockResolvedValue(null);
      const result = await service.deleteMenuClass(arg);
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      mockFn();
      menuClassRepository.delete.mockRejectedValue(new Error());
      const result = await service.deleteMenuClass(arg);
      expect(result).toEqual(false);
    });
  });
  describe('deleteMenu', () => {
    const arg = { owner_id: 1, menu_id: 2 };
    it('delete메소드 정상 실행', async () => {
      mockFn();
      menuRepository.delete.mockResolvedValue(null);
      const result = await service.deleteMenu(arg);
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      mockFn();
      menuRepository.delete.mockRejectedValue(new Error());
      const result = await service.deleteMenu(arg);
      expect(result).toEqual(false);
    });
  });
  describe('deleteMenuOption', () => {
    const arg = { owner_id: 1, option_id: 2 };
    it('delete메소드 정상 실행', async () => {
      mockFn();
      optionRepository.delete.mockResolvedValue(null);
      const result = await service.deleteMenuOption(arg);
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      mockFn();
      optionRepository.delete.mockRejectedValue(new Error());
      const result = await service.deleteMenuOption(arg);
      expect(result).toEqual(false);
    });
  });
  describe('deleteMenuOptionSelection', () => {
    const arg = { owner_id: 1, selection_id: 2 };
    it('delete메소드 정상 실행', async () => {
      mockFn();
      selectionRepository.delete.mockResolvedValue(null);
      const result = await service.deleteMenuOptionSelection(arg);
      expect(result).toEqual(true);
    });
    it('delete메소드 실패', async () => {
      mockFn();
      selectionRepository.delete.mockRejectedValue(new Error());
      const result = await service.deleteMenuOptionSelection(arg);
      expect(result).toEqual(false);
    });
  });
});
