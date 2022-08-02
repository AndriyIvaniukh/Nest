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
        this.users.find((user) => {
            console.log('found user');
            console.log(user.id);
            console.log(id);
            if (user.id === id) {
                user = {...updateUserFields}
                console.log(user);
            }
        });

        return this.users;
    }

    delete(id: string) {
        const deletedUser = this.users.filter((user) => user.id !== id);
        return deletedUser;
    }
}
