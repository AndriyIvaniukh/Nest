import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../core/prisma.service";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController]
})
export class UserModule {}
