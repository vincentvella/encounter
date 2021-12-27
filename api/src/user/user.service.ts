import { Profile, User } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async insertOne(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findByNumber(phoneNumber: string) {
    return this.prisma.user.findUnique({ where: { phoneNumber } })
  }

  async findByIdWithProfile(id: string): Promise<User & { profile: Profile }> {
    return this.prisma.user.findUnique({ where: { id }, include: { profile: true } })
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } })
  }
}