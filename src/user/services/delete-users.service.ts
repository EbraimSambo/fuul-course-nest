import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,  
      ){}
    
      remove(id: number) {
        return `This action removes a #${id} user`;
      }
}
