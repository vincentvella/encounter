import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RemoveProfile } from './entities/remove-profile.entity';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(of => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) { }

  @Mutation((returns) => Profile)
  createProfile(@Args('data') data: CreateProfileDto) {
    return this.profileService.create(data);
  }

  @Query((returns) => [Profile])
  findAllProfiles() {
    return this.profileService.findAll();
  }

  @Query((returns) => Profile, { nullable: true })
  findProfile(@CurrentUser() user: User) {
    return this.profileService.findOne(+user.id);
  }

  @Mutation((returns) => Profile)
  updateProfile(@Args('id') id: string, @Args('profile') profile: UpdateProfileDto) {
    return this.profileService.update(+id, profile);
  }

  @Mutation((returns) => RemoveProfile)
  removeProfile(@Args('id') id: string) {
    return this.profileService.remove(+id);
  }
}
