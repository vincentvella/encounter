import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

@InputType()
export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
