import {Injectable} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user.dto";
import {PrismaService} from "../core/prisma.service";
import {Prisma, User} from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async getById(userId: string) {
        return this.prismaService.user.findFirst({
            where: {id: userId}
        });
    }

    async getUserByEmail(userEmail: string) {
        return this.prismaService.user.findFirst({
            where: {email: userEmail}
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
            data
        });
    }

    async update(userId: string, updateUserFields: UpdateUserDto) {
        return this.prismaService.user.update({
            where: {id: userId},
            data: {
                ...updateUserFields
            }
        });
    }

    delete(userId: string) {
        return this.prismaService.user.delete({
            where: {id: userId}
        })
    }
}
