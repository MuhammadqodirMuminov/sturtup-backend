import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  fullname: string;
}
