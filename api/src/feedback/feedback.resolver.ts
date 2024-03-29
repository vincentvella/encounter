import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { UpdateFeedbackInput } from './dto/update-feedback.input';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Mutation(() => Feedback)
  createFeedback(@Args('createFeedbackInput') createFeedbackInput: CreateFeedbackInput, @CurrentUser() user: User) {
    return this.feedbackService.create(createFeedbackInput, user);
  }

  @Query(() => [Feedback], { name: 'feedback' })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Query(() => Feedback, { name: 'feedback' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feedbackService.findOne(id);
  }

  @Mutation(() => Feedback)
  updateFeedback(@Args('updateFeedbackInput') updateFeedbackInput: UpdateFeedbackInput) {
    return this.feedbackService.update(updateFeedbackInput.id, updateFeedbackInput);
  }

  @Mutation(() => Feedback)
  removeFeedback(@Args('id', { type: () => Int }) id: number) {
    return this.feedbackService.remove(id);
  }
}
