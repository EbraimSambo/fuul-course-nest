import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUsersService } from './services/create-users.service';
import { ReadUsersService } from './services/read-users.service';
import { ReadUsersController } from './controllers/read-users.controller';
import { DeleteUsersService } from './services/delete-users.service';
import { UpdateUsersService } from './services/update-users.service';
import { UpdateUsersController } from './controllers/update-users.controller';

@Module({
  controllers: [
    UserController,
    CreateUserController,
    CreateUserController,
    ReadUsersController,
    UpdateUsersController
  ],
  providers: [
    UserService,
    CreateUsersService,
    ReadUsersService,
    DeleteUsersService,
    UpdateUsersService
  ],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
