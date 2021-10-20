import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, mockReset } from 'jest-mock-extended'
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { User, PrismaClient } from '.prisma/client';

const id = uuidv4();

const user: User = {
  id,
  phoneNumber: '13025556460',
  fbUserId: null
}

const mockedClient = mockDeep<PrismaClient>()

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    mockReset(mockedClient)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockedClient,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertOne', () => {
    it('should successfully insert an user', async () => {
      jest.spyOn(prisma.user, 'create').mockResolvedValue(user)
      await expect(
        service.insertOne({
          phoneNumber: '13025556460'
        }),
      ).resolves.toEqual(user);
    });
  });
});