import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userEntityMock = {
        id: 'test-id',
        name: 'test-name',
        username: 'test-username',
        email: 'test-email',
        password: 'test-password',
      } as User;

      const createUserDto: CreateUserDto = {
        name: 'test-name',
        username: 'test-username',
        email: 'test-email',
        password: 'test-password',
      };
      jest
        .spyOn(usersService, 'create')
        .mockReturnValueOnce(Promise.resolve(userEntityMock));

      const user = await usersController.create(createUserDto);

      expect(user).toBeDefined();
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(user).toEqual(userEntityMock);
    });
  });
});
