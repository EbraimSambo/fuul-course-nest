import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ReadUsersService } from '../services/read-users.service';

@Controller('users')
export class ReadUsersController {

  constructor(
    private readonly readUsersService: ReadUsersService
  ) { }

  @Get('all')
  findAll() {
    return this.readUsersService.findAll();
  }

  @Get('all-users')
  findAllPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.readUsersService.pagination({ page,limit});
  }
}
