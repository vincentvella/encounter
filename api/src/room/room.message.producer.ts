import { Profile, User } from ".prisma/client";
import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class RoomMessageProducerService {
  constructor(@InjectQueue('user-waiting') private queue: Queue) { }

  async queueUser(user: User & { profile: Profile }) {
    await this.queue.add('user-waiting-job', {
      userId: user.id,
      ...user.profile,
      timestamp: Date.now()
    });
  }
}