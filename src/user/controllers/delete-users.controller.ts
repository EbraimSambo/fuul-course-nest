import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUsersService } from '../services/delete-users.service';

@Controller('delete-users')
export class DeleteUsersController {

    constructor(
        private deleteUserService: DeleteUsersService
    ){}
    
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserService.remove(+id);
  }
}
