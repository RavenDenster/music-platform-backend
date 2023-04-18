import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { MongooseModule } from '@nestjs/mongoose'
import { Track, TrackSchema } from "../track/schemas/track.schema";
import { FileService } from "src/file/file.service";
import { Album, AlbumSchema } from "src/album/album.schema";
import { TrackService } from "src/track/track.service";
import { Comment, CommentSchema } from "src/track/schemas/comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    ],
    controllers: [AlbumController], 
    providers: [AlbumService, FileService, TrackService], 
})
export class AlbumModule {}