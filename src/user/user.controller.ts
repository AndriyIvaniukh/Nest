import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Prisma} from "@prisma/client";
import {AuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get('/:id')
    // @UseGuards(AuthGuard)
    getUserById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    //
    // @Post()
    // createUser(@Body() user: Prisma.UserCreateInput) {
    //     return this.userService.create(user);
    // }

    @Patch('/:id')
    // @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    // @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
