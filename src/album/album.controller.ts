import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { TrackService } from 'src/track/track.service';
import { AddTrackDto } from './dto/add-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RemoveTrackDto } from './dto/remove-track.dto';

@Controller('/album')
export class AlbumController {
    constructor(private albumService: AlbumService, private trackService: TrackService ) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.albumService.create(dto, picture[0])
    }

    @Get()
    getAll() { 
        return this.albumService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }

    @Post('/tracks') 
    addTrack(@Body() dto: AddTrackDto) {
        return this.albumService.addTrack(dto)
    }

    @Put('/tracks/delete/:id')
    removeTrack(@Body() dto: RemoveTrackDto, @Param('id') id: string) {
        return this.albumService.removeTrack(dto, id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }
}