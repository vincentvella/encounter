import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation((returns) => User)
  async createUser(@Args('data') data: CreateUserDTO) {
    const password = await argon2.hash(data.password)
    return this.userService.insertOne({ ...data, password })
  }

  @Query((returns) => User, { nullable: true })
  findUser(@Args('number') number: string) {
    return this.userService.findByNumber(number)
  }
}