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
import { UserRepository,IUserRepository } from './repositories/user.repository';
import { VeryfieldUsersService } from './services/veryfield-users.service';
import { DeleteUsersController } from './controllers/delete-users.controller';

@Module({
  controllers: [
    UserController,
    CreateUserController,
    CreateUserController,
    ReadUsersController,
    UpdateUsersController,
    DeleteUsersController
  ],
  providers: [
    UserService,
    CreateUsersService,
    ReadUsersService,
    DeleteUsersService,
    UpdateUsersService,
    UserRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository
    },
    VeryfieldUsersService,
  ],
  imports: [TypeOrmModule.forFeature([User])],

})
export class UserModule { }
