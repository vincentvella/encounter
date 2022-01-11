import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) { }

  removeUsersFromWaiting(callerId: string, calleeId: string) {
    return this.prisma.$transaction([
      // Attempt to delete both users.. if successful - we add them to room
      this.prisma.userWaiting.delete({ where: { profileId: callerId } }),
      this.prisma.userWaiting.delete({ where: { profileId: calleeId } })
    ])
  }

  async create(createRoomInput: CreateRoomInput) {
    const { callerId, calleeId } = createRoomInput
    await this.removeUsersFromWaiting(callerId, calleeId)
    return this.prisma.room.create({
      data: {
        callerId,
        calleeId
      },
      include: { caller: true, callee: true }
    })
  }

  endCall(id: string) {
    return this.prisma.room.update({ where: { id }, data: { ended: new Date() } })
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({ where: { id } })
  }

  findRoomForUser(callId: string) {
    return this.prisma.room.findFirst({
      where: {
        OR: [{ callerId: callId }, { calleeId: callId }],
        AND: [{ ended: { equals: null } }]
      }
    })
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
      const deleted = await this.prisma.room.delete({ where: { id } })
      return deleted
    } catch (err) {
      return null
      // Ignoring errors because both clients will attempt to delete the record
    }
  }
}
