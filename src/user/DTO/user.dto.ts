import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
  _id? : string

  @IsNotEmpty()
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  token?: string
  roel?: string
  isActive?: boolean
  cart?: { productId: string; size : string, quantity: number }[]
}


export class createUserContactDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  phoneNum: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: {
    street: string,
    city: string,
  };
  
}