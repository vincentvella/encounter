import { Test } from '@nestjs/testing';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserController } from './user.controller'
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          insertOne: jest.fn().mockImplementation((user: UserDTO) => Promise.resolve({ id, ...user }))
        }
      }],
    }).compile();
    userController = moduleRef.get<UserController>(UserController)
    userService = moduleRef.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should return created user', async () => {
      const newUser: UserDTO = {
        phoneNumber: '13025556460'
      }
      await expect(userController.createUser(newUser)).resolves.toEqual({ id, ...newUser })
    });
  });
})