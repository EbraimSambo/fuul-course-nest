import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './auth.constants';
import { JwtStrategy } from './guards/jwt-strategy';
import { ArtistsService } from 'src/artists/artists.service';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  providers: [AuthService,JwtStrategy,ArtistsService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Artist]),
    JwtModule.register({secret: authConstant.secret,signOptions:{
      expiresIn: '1d'
    }}),
  ]
})
export class AuthModule {}
