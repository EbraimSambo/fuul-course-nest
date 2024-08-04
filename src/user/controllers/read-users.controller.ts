import { Controller, Get } from '@nestjs/common';
import { ReadUsersService } from '../services/read-users.service';

@Controller('read-users')
export class ReadUsersController {
    
    constructor(private readonly readUsersService: ReadUsersService) {}

    @Get('all')
    findAll() {
      return this.readUsersService.findAll();
    }
}
