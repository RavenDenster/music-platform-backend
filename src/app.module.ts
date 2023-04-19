import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path'
import { ConfigModule } from "@nestjs/config";
import { AlbumModule } from "./album/album.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
// import { ZeroModule } from "./zero/zero.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        TrackModule,
        AlbumModule,
        FileModule,
        UsersModule,
        AuthModule,
        // ZeroModule
    ]
})
export class AppModule {}