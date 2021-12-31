import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';


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

  async addSocketId(room: string, profileId: string, socketId: string) {
    try {
      const roomArray = await Promise.all([
        this.prisma.room.update({
          data: { profile1SocketId: socketId },
          where: { profile1Id: profileId }
        }),
        this.prisma.room.update({
          data: { profile2SocketId: socketId },
          where: { profile2Id: profileId }
        })
      ])
      return roomArray.filter(Boolean)[0]
    } catch (err) {
      console.error('Error adding socket id:', { room, profileId, socketId })
    }
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
  async remove(socketId: string) {
    try {
      const room = await this.prisma.room.findFirst({ where: { OR: { profile2SocketId: socketId, profile1SocketId: socketId } } })
      return this.prisma.room.delete({ where: { id: room.id } })
    } catch (err) {
      console.error('error deleting room', err)
    }
  }
}
