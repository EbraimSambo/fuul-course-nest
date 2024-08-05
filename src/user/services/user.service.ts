import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ){}

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  

}
