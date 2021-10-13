import { IsNotEmpty, IsString } from "class-validator";

export class VerifyDTO {
  @IsString()
  @IsNotEmpty()
  number: string
}