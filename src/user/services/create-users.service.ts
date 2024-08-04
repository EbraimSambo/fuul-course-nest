import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { IUserRepository } from '../repositories/user.repository';
import { VeryfieldUsersService } from './veryfield-users.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private veryUsersService: VeryfieldUsersService
  ) { }
  async create(createUserDto: CreateUserDto) {

    await this.veryUsersService.findEmail(createUserDto.email)

    const user = new User()
    user.email = createUserDto.email
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.password = createUserDto.password
    await this.userRepo.create(user)
    return user;
  }

}
