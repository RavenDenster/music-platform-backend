import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "src/album/album.schema";
import { Users, UsersSchema } from "src/users/users.schema";
import { UsersService } from "src/users/users.service";
import { AuthController } from "./auth.controller";
import { Auth, AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '20d'
            }
        })
    ],
    controllers: [AuthController], 
    providers: [AuthService, UsersService], 
    exports: [
        AuthService,
        JwtModule
    ]
})

export class AuthModule {}