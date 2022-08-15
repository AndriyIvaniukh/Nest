import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Prisma} from "@prisma/client";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {ApiBody, ApiOkResponse, ApiQuery, ApiTags} from "@nestjs/swagger";
import {config} from "rxjs";
import {CustomOkResponse} from "../core/swagger/swagger.helper";
import {SWAGGER_EXAMPLE_GET_USER_BY_ID} from "../core/swagger/examples/swagger-example-user.list";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers() {
        return this.userService.getAll();
    }

    @Get('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    // @CustomOkResponse({exampleData: SWAGGER_EXAMPLE_GET_USER_BY_ID})
    @ApiOkResponse({
        status: 200,
        schema: {
            example: {
                id: "62ecfeb8c274ac64eb08d7b7",
                userName: "Andriy",
                email: "andriy1@gmail.com",
                age: null,
                status: false,
                password: "$2b$07$.N7828ve4snOyUTTrEjUmuVswdb95SdZ6mLvjFOxm6q11J5Npp.w.",
                createAt: "2022-08-05T11:27:52.000Z",
                updateAt: "2022-08-05T11:27:52.000Z"
            }
        }
    })
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
