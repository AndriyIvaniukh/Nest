import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Prisma} from "@prisma/client";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @ApiOkResponse()
    @UseGuards(AuthGuard)
    getUserById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    //
    // @Post()
    // @ApiBody({type: CreateUserDto})
    // createUser(@Body() user: Prisma.UserCreateInput) {
    //     return this.userService.create(user);
    // }

    @Patch('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @UseGuards(AuthGuard)
    @ApiBody({type: UpdateUserDto})
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
