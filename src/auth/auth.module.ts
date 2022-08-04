import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserService} from "../user/user.service";
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [AuthService, UserService, PrismaService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
