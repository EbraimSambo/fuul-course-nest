import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class ReadUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) { }

  async findAll() {
    return await this.userRepo.findAll();
  }
}
