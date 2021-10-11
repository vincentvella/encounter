import { Account } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { AccountDTO } from "./account.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) { }

  async insertOne(data: AccountDTO): Promise<Account> {
    return this.prisma.account.create({ data })
  }
}