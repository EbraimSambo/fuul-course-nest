import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, PayloadType } from './auth.types';

import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ) { }

    async login(loginDto: LoginDto):Promise<{accessToken: string } | { validate2FA: string; message: string }> {
       
        const {email,password} = loginDto
        const user = await this.userRepo.findOne({
            where:{
                email,
            }
        })

        if(!user) throw new NotFoundException("User not found")

        if(!await compare(password, user.password)) throw new UnauthorizedException("Password error")
        
        const payLoad: PayloadType = {email, userId: user.id}
        const artist = await this.artistService.findOne(user.id)
        if(artist){
            payLoad.artistId = artist.id
        }
        if (user.enable2FA && user.twoFASecret) {
            return {
              validate2FA: 'http://localhost:3000/auth/validate-2fa',
              message:
                'Please sends the one time password/token from your Google Authenticator App',
            };
          }
        return {
            accessToken: this.jwtService.sign(payLoad)
        }
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userRepo.findOne({where:{id:userId}}); //1
        if (user.enable2FA) {
          //2
          return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret(); //3
        console.log(secret);
        user.twoFASecret = secret.base32; //4
        await this.updateSecretKey(user.id, user.twoFASecret); //5
        return { secret: user.twoFASecret }; //6
      }     

      async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
        return this.userRepo.update(
          { id: userId },
          {
            twoFASecret: secret,
            enable2FA: true,
          },
        );
      }

      async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userRepo.update(
          { id: userId },
          {
            enable2FA: false,
            twoFASecret: null,
          },
        );
      }

      async validate2FAToken(
        userId: number,
        token: string,
      ): Promise<{ verified: boolean }> {
        try {
          // find the user on the based on id
          const user = await this.userRepo.findOne({where:{id:userId}});
    
          // extract his 2FA secret
    
          // verify the secret with token by calling the speakeasy verify method
          const verified = speakeasy.totp.verify({
            secret: user.twoFASecret,
            token: token,
            encoding: 'base32',
          });
    
          // if validated then sends the json web token in the response
          if (verified) {
            return { verified: true };
          } else {
            return { verified: false };
          }
        } catch (err) {
          throw new UnauthorizedException('Error verifying token');
        }
      }


}
