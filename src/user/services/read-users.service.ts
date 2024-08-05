import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { VeryfieldUsersService } from './veryfield-users.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class ReadUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private veryUsersService: VeryfieldUsersService
  ) { }

  async findAll() {
    return await this.userRepo.findAll();
  }
  async pagination(options: IPaginationOptions) {
    return await this.veryUsersService.pagination(options);
  }

}
