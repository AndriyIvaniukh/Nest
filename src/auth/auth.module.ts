import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserService} from '../user/user.service';
import {PrismaService} from '../core/prisma.service';
import {JwtModule, JwtService} from '@nestjs/jwt';

@Module({
    providers: [AuthService, UserService, PrismaService, JwtService],
    controllers: [AuthController],
    imports:[
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '2d'}
        })
    ]
})
export class AuthModule {
}
