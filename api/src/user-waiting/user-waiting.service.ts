import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserWaitingService {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create User Waiting  
   * @param {string} id Pass profile id of profile connecting to user waiting table`
   * @returns promise of created userwaiting record
   */
  create(id: string) {
    return this.prisma.userWaiting.create({ data: { profile: { connect: { id } } } })
  }

  findAll() {
    return `This action returns all userWaiting`;
  }

  findOne(id: number) {
    return this.prisma.userWaiting.findUnique({
      where: { id },
      include: {
        profile: { include: { user: true, SearchCriteria: true } }
      }
    })
  }

  update(id: number) {
    return `This action updates a #${id} userWaiting`;
  }

  remove(id: number) {
    return this.prisma.userWaiting.delete({ where: { id } })
  }
}
