import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) { }

  create(createProfileDto: CreateProfileDto, id: string): Promise<Profile> {
    return this.prisma.profile.create({ data: { ...createProfileDto, user: { connect: { id } } } })
  }

  findAll() {
    return this.prisma.profile.findMany()
  }

  findOne(id: string) {
    return this.prisma.profile.findUnique({ where: { userId: id } })
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
