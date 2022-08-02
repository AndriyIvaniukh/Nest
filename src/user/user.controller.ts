import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }


    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get('/:id')
    getUserById(@Param() id: string) {
        return this.userService.getById(id);
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Patch('/:id')
    updateUser(@Param() id: string, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    deleteUser(@Param() id: string) {
        return this.userService.delete(id);
    }
}
