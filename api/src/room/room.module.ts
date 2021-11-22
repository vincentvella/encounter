import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { UserService } from 'src/user/user.service';
import { RoomMessageProducerService } from './room.message.producer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({
    name: 'user-waiting',
  })],
  providers: [RoomResolver, RoomService, UserService, RoomMessageProducerService]
})
export class RoomModule { }
