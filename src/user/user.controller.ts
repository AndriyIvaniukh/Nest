import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Prisma} from "@prisma/client";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }


    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get('/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    createUser(@Body() user: Prisma.UserCreateInput) {
        return this.userService.create(user);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
