import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly accountService: UserService) { }

  @Mutation((returns) => User)
  createUser(@Args('data') data: CreateUserDTO) {
    return this.accountService.insertOne(data)
  }
}