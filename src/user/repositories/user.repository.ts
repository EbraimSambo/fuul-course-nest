import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";


export interface IUserRepository {
    create(values: CreateUserDto): Promise<User>
    update(id: number, values: User): void
    findAll(): Promise<User[]>
    findOne(id: number): Promise<User>
    remove(id: number): void
}


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private typeOrm: Repository<User>
    ) { }

    async create(values: User): Promise<User> {
        return await this.typeOrm.save(values)
    }

    async findAll(): Promise<User[]> {
        return await this.typeOrm.find()
    }

    async findOne(id: number): Promise<User> {
        return await this.typeOrm.findOneOrFail({ where: { id } })
    }
    async remove(id: number) {
        return await this.typeOrm.delete(id)
    }
    async update(id: number, values: User) {
        await this.typeOrm.update(id, values)
    }
}