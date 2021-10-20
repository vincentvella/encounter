import { User } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async insertOne(data: UserDTO): Promise<User> {
    return this.prisma.user.create({ data })
  }
}