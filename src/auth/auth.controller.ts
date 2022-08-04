import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {RegisterAuthDto} from "./dto/register-auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() data: LoginAuthDto ){
        return this.authService.login(data);
    }

    @Post('/register')
    register(@Body() data: RegisterAuthDto){
        return this.authService.register(data);
    }
}
