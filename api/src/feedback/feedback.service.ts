import { Injectable } from '@nestjs/common';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';

@Injectable()
export class FeedbackService {
  create(createFeedbackInput: CreateFeedbackInput) {
    // Create Room Feedback - here
    // Create User feedback - here
    // Attempt to Create Encounter - encounter service
    // If Attempt to Create Fails, Update - encounter service
    // Notify users they have a match!!
    return 'This action adds a new feedback';
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
