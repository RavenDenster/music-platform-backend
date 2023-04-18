import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { Album, AlbumSchema } from "src/album/album.schema";
import { AlbumService } from "src/album/album.service";
import { AuthModule } from "src/auth/auth.module";
import { FileService } from "src/file/file.service";
import { Comment, CommentSchema } from "src/track/schemas/comment.schema";
import { Track, TrackSchema } from "src/track/schemas/track.schema";
import { TrackService } from "src/track/track.service";
import { UsersController } from "./users.controller";
import { Users, UsersSchema } from "./users.schema";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        AuthModule
    ],
    controllers: [UsersController], 
    providers: [UsersService, TrackService, AlbumService, FileService], 
    exports: [UsersService]
})
export class UsersModule {}