import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) { }

  remove(id: number) {
    return this.userRepo.remove(id);
  }
}
