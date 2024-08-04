import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUsersService } from '../services/create-users.service';

@Controller('register')
export class CreateUserController {

  constructor(private readonly userService: CreateUsersService) { }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
