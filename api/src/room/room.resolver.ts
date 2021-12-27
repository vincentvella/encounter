import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { RoomMessageProducerService } from './room.message.producer';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'src/pubSub/pubSub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PendingRoom } from './entities/pendingRoom.entity';
import { UserWaitingService } from 'src/user-waiting/user-waiting.service';

const ROOM_CREATED_EVENT = 'roomCreated';

const roomCreatedForUser = (room: Room, user: User) =>
  !!(user?.id && (user.id === room.profile1.userId || user.id === room.profile2.userId))

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly profileService: ProfileService,
    private readonly roomMessageProducerService: RoomMessageProducerService,
    private readonly userWaitingService: UserWaitingService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) { }

  @Query(() => PendingRoom)
  async waitForRoom(@CurrentUser() user: User) {
    const profile = await this.profileService.findOne(user.id)
    const userWaiting = await this.userWaitingService.create(profile.id)
    await this.roomMessageProducerService.queueUser(userWaiting.id, userWaiting.queuedAt)
    return { waiting: true }
  }

  @Subscription((returns) => Room, {
    nullable: true,
    filter: (payload: { roomCreated: Room }, variables, context) =>
      !!roomCreatedForUser(payload.roomCreated, context?.req?.user)
  })
  roomCreated(@CurrentUser() user: User) {
    return this.pubSub.asyncIterator(ROOM_CREATED_EVENT);
  }

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'room' })
  findAll() {
    return this.roomService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.remove(id);
  }
}
