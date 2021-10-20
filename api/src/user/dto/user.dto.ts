import { User } from ".prisma/client";
import { IsOptional, IsString } from "class-validator";

export class UserDTO {
  @IsOptional()
  @IsString()
  phoneNumber?: User['phoneNumber']

  @IsOptional()
  @IsString()
  fbUserId?: User['fbUserId']
}

