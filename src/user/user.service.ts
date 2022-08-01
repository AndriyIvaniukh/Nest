import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {
    private users = [];

    getAll(){
        return this.users;
    }

    getById(id: string){
        return this.users.find((user)=> user.id == id);
    }

    create(user: CreateUserDto){
        this.users.push({
            ...user,
            id: new Date().valueOf()
        });
        return user;
    }

    update(updateUserFields){
        let userToUpdate = this.users.find((user) => user.id = updateUserFields.id);
        userToUpdate = {...userToUpdate, ...updateUserFields};
    }

    delete(id: string){

    }
}
