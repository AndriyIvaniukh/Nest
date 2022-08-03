import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    private users = [];

    getAll() {
        return this.users;
    }

    getById(id: string) {
        return this.users.find((user) => user.id == id);
    }

    create(user: CreateUserDto) {
        this.users.push({
            ...user,
            id: new Date().valueOf()
        });
        return user;
    }

    update(id: string, updateUserFields: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id == id) {
                user = {...user, ...updateUserFields}
                console.log(user);
                return user;
            }
        });

        return this.users;
    }

    delete(id: string) {
        this.users = this.users.filter((user) => user.id !== Number(id));
        return `delete user with id ${id}`;
    }
}
