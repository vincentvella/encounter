import { Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { PrismaService } from "src/prisma/prisma.service";
import { PUB_SUB } from "src/pubSub/pubSub.module";
import { RoomService } from "./room.service";
import { Profile as ProfileType, UserWaiting as UserWaitingType } from '@prisma/client'
import { UserWaitingService } from "src/user-waiting/user-waiting.service";
import { RoomMessageProducerService } from "./room.message.producer";

const ROOM_CREATED_EVENT = 'roomCreated';

type QueuedUserWithData = UserWaitingType & { profile: ProfileType }

type UserWaitingJobData = {
  userWaitingId: number
  queuedAt: Date
}

@Processor('user-waiting')
export class RoomMessageConsumer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
    private readonly userWaitingService: UserWaitingService,
    private readonly roomMessageProducerService: RoomMessageProducerService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) { }

  async findMatch(callerId: string, queuedUsers: QueuedUserWithData[]) {
    for (const queuedUser of queuedUsers) {
      try {
        const room = await this.roomService.create({
          callerId,
          calleeId: queuedUser.profileId
        })
        await this.pubSub.publish(ROOM_CREATED_EVENT, { roomCreated: room });
        return room
      } catch (err) {
        console.error(err)
      }
    }
  }

  async matchmaking(job: Job<UserWaitingJobData>) {
    const thirtySecondsAgo = new Date()
    thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30)
    if (thirtySecondsAgo < new Date(job.data.queuedAt)) {
      const userWaiting = await this.userWaitingService.findOne(job.data.userWaitingId)
      if (userWaiting) {
        // User has not left queue
        // Queries for all potential matches for the user
        const possibleMatches = await this.prisma.userWaiting.findMany({
          where: { profileId: { not: userWaiting.profileId } },
          // TODO: update these filters to include lat/lng selection?
          // TODO: update where clause with desired "looking for" preference
          orderBy: { queuedAt: 'asc' },
          take: 50,
          include: { profile: true }
        })
        const match = await this.findMatch(userWaiting.profileId, possibleMatches)
        if (!match) {
          // If no match found and search is within 30 seconds, re-queue the user to be reevaluated
          await new Promise(resolve => {
            setTimeout(async () => {
              await this.roomMessageProducerService.queueUser(userWaiting.id, userWaiting.queuedAt)
              resolve(undefined)
            }, 1000)
          })
        }
      }
    } else {
      // If user is in queue longer than 30 seconds, remove them from the queue
      await this.userWaitingService.remove(job.data.userWaitingId)
    }
  }

  @Process('user-waiting-job')
  readOperationJob(job: Job<UserWaitingJobData>) {
    this.matchmaking(job)
  }
}