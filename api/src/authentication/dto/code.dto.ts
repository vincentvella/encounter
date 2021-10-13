import { IsNotEmpty, IsString } from "class-validator";

export class CodeDTO {
  @IsString()
  @IsNotEmpty()
  request_id: string

  @IsString()
  @IsNotEmpty()
  code: string
}