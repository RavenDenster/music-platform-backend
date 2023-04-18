import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { TrackService } from 'src/track/track.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { ObjectId } from 'mongoose';
import { AddTrackUserDto } from './dto/add-track-user.dto';
import { RemoveTrackUserDto } from './dto/remove-track-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService ) {}
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto)
    }

    // функция на фронте не задействуется
    @Get()
    getAll() { 
        return this.usersService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.usersService.getOne(id)
    }

    @Post('/albums') 
    addAlbum(@Body() dto: AddTrackUserDto) {
        return this.usersService.addAlbum(dto)
    }

    @Put('/albums/delete/:id')
    removeAlbum(@Body() dto: RemoveTrackUserDto, @Param('id') id: string) {
        return this.usersService.removeAlbum(dto, id)
    }

    // функция на фронте не задействуется
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.usersService.delete(id)
    } 
}