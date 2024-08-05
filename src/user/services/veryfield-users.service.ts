import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class VeryfieldUsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findEmail(email: string) {

        const userExist = await this.userRepo.findOne({
            where: {
                email: email
            }
        })

        if (userExist) throw new ConflictException("Usuario já cadastrado")

        return userExist
    }

    
  async pagination(options: IPaginationOptions){
    const query = this.userRepo.createQueryBuilder('c');
    query.orderBy('c.lastName', 'DESC');
    return paginate<User>(query,options)
}

}
