import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { RoomMessageProducerService } from './room.message.producer';
import { BullModule } from '@nestjs/bull';
import { ProfileService } from 'src/profile/profile.service';
import { PubSubModule } from 'src/pubSub/pubSub.module';
import { UserWaitingService } from 'src/user-waiting/user-waiting.service';
import { RoomMessageConsumer } from './room.message.consumer';

@Module({
  imports: [BullModule.registerQueue({
    name: 'user-waiting',
  }), PubSubModule],
  providers: [RoomResolver, RoomService, ProfileService, UserWaitingService, RoomMessageProducerService, RoomMessageConsumer,
  ]
})
export class RoomModule { }
