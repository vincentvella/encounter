import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) { }

  removeUsersFromWaiting(profile1Id: string, profile2Id: string) {
    return this.prisma.$transaction([
      // Attempt to delete both users.. if successful - we add them to room
      this.prisma.userWaiting.delete({ where: { profileId: profile1Id } }),
      this.prisma.userWaiting.delete({ where: { profileId: profile2Id } })
    ])
  }

  async create(createRoomInput: CreateRoomInput) {
    const { profile1Id, profile2Id } = createRoomInput
    await this.removeUsersFromWaiting(profile1Id, profile2Id)
    return this.prisma.room.create({
      data: {
        profile1Id,
        profile2Id
      },
      include: { profile1: true, profile2: true }
    })
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  findRoomForUser(profileId: string) {
    return this.prisma.room.findFirst({ where: { OR: [{ profile1Id: profileId }, { profile2Id: profileId }] } })
  }

  update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`;
  }

  /**
   * Delete's User's Room
   * @param id Room ID
   * @returns Promise<Prisma.Prisma__RoomClient<Room>>
   */
  async remove(id: string) {
    try {
      const deleted = await this.prisma.room.delete({ where: { id: id } })
      return deleted
    } catch (err) {
      return null
      // Ignoring errors because both clients will attempt to delete the record
    }
  }
}
