import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation((returns) => User)
  createUser(@Args('data') data: CreateUserDTO) {
    return this.userService.insertOne(data)
  }

  @Query((returns) => User, { nullable: true })
  findUser(@Args('number') number: string) {
    return this.userService.findByNumber(number)
  }
}