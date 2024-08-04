import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUsersService } from '../services/update-users.service';

@Controller('update-users')
export class UpdateUsersController {

    constructor(private updateUsersService: UpdateUsersService){}
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.updateUsersService.update(+id, updateUserDto);
    }
}
