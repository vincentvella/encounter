import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/room/room.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
    private readonly userService: UserService
  ) { }

  async create(createFeedbackInput: CreateFeedbackInput, user: User) {
    const room = await this.roomService.findOne(createFeedbackInput.roomId)
    const userWithProfile = await this.userService.findByIdWithProfile(user.id)
    await this.createRoomFeedback(createFeedbackInput)
    await this.createUserFeedback(
      createFeedbackInput,
      userWithProfile.profile.id,
      userWithProfile.profile.id === room.calleeId ? room.callerId : room.calleeId
    )
    try {
      const encounterAsP1 = await this.prisma.encounter.create({
        data: {
          room: { connect: { id: room.id } },
          profile1: { connect: { userId: user.id } },
          profile1SharedAttributes: { create: createFeedbackInput.sharedAttributes },
        }
      })
      return {
        id: encounterAsP1.id
      }
    } catch (err) {
      if (err.code === 'P2014') {
        const encounterAsP2 = await this.prisma.encounter.update({
          where: { id: room.id },
          data: {
            profile2: { connect: { userId: user.id } },
            profile2SharedAttributes: { create: createFeedbackInput.sharedAttributes },
            savedOn: new Date()
          }
        })
        return {
          id: encounterAsP2.id
        }
      }
      console.error(err)
    }
    // Notify users they have a match!!
    return '';
  }

  createRoomFeedback(createFeedbackInput: CreateFeedbackInput) {
    const { roomId, callQuality } = createFeedbackInput
    return this.prisma.feedback.create({
      data: {
        callQuality,
        room: { connect: { id: roomId } }
      }
    })
  }

  createUserFeedback(createFeedbackInput: CreateFeedbackInput, raterId: string, ratedId: string) {
    const { peerRating } = createFeedbackInput
    return this.prisma.userFeedback.create({
      data: {
        userQuality: peerRating,
        raterId,
        ratedId
      }
    })
  }

  findAll() {
    return `This action returns all feedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackInput: UpdateFeedbackInput) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
