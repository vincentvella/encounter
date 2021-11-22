import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('user-waiting')
export class RoomMessageConsumer {

  @Process('user-waiting-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}