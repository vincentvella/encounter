import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserWaitingService } from './user-waiting.service';
import { UserWaiting } from './entities/user-waiting.entity';

@Resolver(() => UserWaiting)
export class UserWaitingResolver {
  constructor(private readonly userWaitingService: UserWaitingService) { }

  @Mutation(() => UserWaiting)
  createUserWaiting(@Args('ProfileId') profileId: string) {
    return this.userWaitingService.create(profileId);
  }

  @Query(() => [UserWaiting], { name: 'userWaiting' })
  findAll() {
    return this.userWaitingService.findAll();
  }

  @Query(() => UserWaiting, { name: 'userWaiting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userWaitingService.findOne(id);
  }

  @Mutation(() => UserWaiting)
  removeUserWaiting(@Args('id', { type: () => Int }) id: number) {
    return this.userWaitingService.remove(id);
  }
}
