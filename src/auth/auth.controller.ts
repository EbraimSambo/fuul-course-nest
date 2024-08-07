import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-gaurd.guard';
import { Enable2FAType } from './auth.types';
import { ValidateTokenDTO } from './dto/validate-token.tdo';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(
      @Request()
      req,
    ): Promise<Enable2FAType> {
      console.log(req.user);
      return this.authService.enable2FA(req.user.userId);
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(
      @Request()
      req,
      @Body()
      ValidateTokenDTO: ValidateTokenDTO,
    ): Promise<{ verified: boolean }> {
      return this.authService.validate2FAToken(
        req.user.userId,
        ValidateTokenDTO.token,
      );
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(
      @Request()
      req,
    ): Promise<UpdateResult> {
      return this.authService.disable2FA(req.user.userId);
    }
}
