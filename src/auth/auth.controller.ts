import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, Req, Res, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService ) {}

    @Post('/refresh')
    async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const token = request.cookies.token
        const data = await this.authService.refresh(token)
        response.cookie('token', data.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return data
    }

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
       const data = await this.authService.login(userDto)
       response.cookie('token', data.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
       return data
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const data = await this.authService.registration(userDto)
        response.cookie('token', data.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return data
    }
}