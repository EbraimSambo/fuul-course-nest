import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  
}
