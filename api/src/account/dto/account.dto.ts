import { Account } from ".prisma/client";
import { IsNotEmpty, IsString, } from "class-validator";

export class AccountDTO implements Omit<Account, 'id'> {
  @IsString()
  @IsNotEmpty()
  username: Account['username']

  @IsString()
  @IsNotEmpty()
  password: Account['password']
}

