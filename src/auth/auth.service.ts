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
import {PrismaService} from "../core/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private prismaService: PrismaService,
    ) {
    }

    async login(data: LoginAuthDto) {
        const user = await this.validateUser(data);
        const token = await this.generateToken(user)
        await this.writeTokenToDB(user, token);
        return token;
    }

    async logout(userId: string){
        await this.deleteTokenFromDB(userId);
        return `User with id ${userId}, was logout`;
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
        if (!userDb) {
            throw new UnauthorizedException({message: 'wrong email or password'})
        }
        const passEqual = await bcrypt.compare(user.password, userDb.password);
        if (passEqual) {
            return userDb;
        }
        throw new UnauthorizedException({message: 'wrong email or password'});
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, name: user.userName, id: user.id};
        return {
            token: this.jwtService.sign(payload, {privateKey: 'secret'})
        };
    }

    private async writeTokenToDB(user: User, token) {
        const data = await this.prismaService.auth.create({
            data: {
                userId: user.id,
                token: token.token
            }
        })
        if(!data){
            throw new UnauthorizedException({message:'cant write token to db'})
        }
    }

    private async deleteTokenFromDB(id:string){

        const data = await this.prismaService.auth.deleteMany({
            where: {
                userId: id
            }
        });
        if(!data){
            console.log(`user with id ${id} not found`);
        }
    }
}
