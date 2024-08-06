import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto):Promise<{accessToken: string}> {
       
        const {email,password} = loginDto
        const user = await this.userRepo.findOne({
            where:{
                email,
            }
        })

        if(!user) throw new NotFoundException("User not found")

        if(!await compare(password, user.password)) throw new UnauthorizedException("Password error")
        
        const payLoad = {email, sub: user.id}
        return {
            accessToken: this.jwtService.sign(payLoad)
        }
    }
}
