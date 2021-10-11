import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, mockReset } from 'jest-mock-extended'
import { AccountService } from './account.service';
import { v4 as uuidv4 } from 'uuid';
import { Account, PrismaClient } from '.prisma/client';

const id = uuidv4();

const account: Account = {
  id,
  username: 'test_user',
  password: 'password'
}

const mockedClient = mockDeep<PrismaClient>()

describe('AccountService', () => {
  let service: AccountService;
  let prisma: PrismaService;

  beforeEach(async () => {
    mockReset(mockedClient)
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: PrismaService,
          useValue: mockedClient,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertOne', () => {
    it('should successfully insert an account', async () => {
      jest.spyOn(prisma.account, 'create').mockResolvedValue(account)
      await expect(
        service.insertOne({
          username: 'test_user',
          password: 'password',
        }),
      ).resolves.toEqual(account);
    });
  });
});