import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,  
      ){}
    
      update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
      }
}
