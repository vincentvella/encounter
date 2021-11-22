import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from 'src/user/user.service';
import { RoomMessageProducerService } from './room.message.producer';

@Resolver(() => Room)
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly roomMessageProducerService: RoomMessageProducerService
  ) { }

  @Query(() => Room)
  async waitForRoom(@CurrentUser() user: User) {
    const userData = await this.userService.findByIdWithProfile(user.id)
    await this.roomMessageProducerService.queueUser(userData)
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
