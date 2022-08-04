import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {LoginAuthDto} from './dto/login-auth.dto';
import {RegisterAuthDto} from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import {User} from '@prisma/client';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {
    }

    async login(data: LoginAuthDto) {
        const user = await this.validateUser(data);
        return this.generateToken(user);
    }

    async register(data: RegisterAuthDto) {
        const findUser = await this.userService.getUserByEmail(data.email);
        if (findUser) {
            throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(data.password, 7);
        const user = await this.userService.create({
            ...data,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    private async validateUser(user: LoginAuthDto) {
        const userDb = await this.userService.getUserByEmail(user.email);
        const passEqual = await bcrypt.compare(user.password, userDb.password);
        if (userDb && passEqual) {
            return userDb;
        }
        throw new UnauthorizedException({message: 'wrong email or password'});
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, name: user.userName, id: user.id};
        return {
            token: this.jwtService.sign(payload, {secret: 'asdaf'}),
        };
    }
}
