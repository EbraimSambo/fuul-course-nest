import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,  
      ){}
      async create(createUserDto: CreateUserDto) {
    
        const userExist = await this.userRepo.findOne({
          where:{
            email: createUserDto.email
          }
        })

        if(userExist) throw new ConflictException("Usuario já cadastrado")
        const user = new User()
        user.email = createUserDto.email
        user.firstName = createUserDto.firstName
        user.lastName = createUserDto.lastName
        user.password = createUserDto.password
        await this.userRepo.save(user)
        return user;
      }
}
