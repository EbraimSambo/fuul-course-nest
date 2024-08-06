import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-gaurd.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request){
    
    return request.user
  }
}
