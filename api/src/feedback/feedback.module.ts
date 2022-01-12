import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackResolver } from './feedback.resolver';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [FeedbackResolver, FeedbackService, RoomService, UserService]
})
export class FeedbackModule { }
