import { Test } from '@nestjs/testing';
import { AccountDTO } from './account.dto';
import { AccountService } from './account.service';
import { AccountController } from './account.controller'
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();


describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{
        provide: AccountService,
        useValue: {
          insertOne: jest.fn().mockImplementation((account: AccountDTO) => Promise.resolve({ id, ...account }))
        }
      }],
    }).compile();
    accountController = moduleRef.get<AccountController>(AccountController)
    accountService = moduleRef.get<AccountService>(AccountService)
  })

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  describe('create', () => {
    it('should return created account', async () => {
      const newAccount: AccountDTO = {
        username: 'account_name',
        password: 'pw123!!'
      }
      await expect(accountController.createAccount(newAccount)).resolves.toEqual({ id, ...newAccount })
    });
  });
})