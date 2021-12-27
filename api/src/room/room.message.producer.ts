import { Profile, User } from ".prisma/client";
import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { UserWaitingService } from "src/user-waiting/user-waiting.service";

@Injectable()
export class RoomMessageProducerService {
  constructor(@InjectQueue('user-waiting') private queue: Queue) { }

  /**
   * Queue User from User Waiting Record
   * @param userWaitingId ID of user waiting record (should be able to pull profile and user info from there to add to queue)
   */
  async queueUser(userWaitingId: number, queuedAt: Date) {
    return this.queue.add('user-waiting-job', { userWaitingId, queuedAt });
  }
}