
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt/dist";
import { CreateUserDto } from "src/users/dto/create-users.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs'
import { Auth, AuthDocument } from "./auth.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "src/users/users.schema";


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService, @InjectModel(Auth.name) private authModel: Model<AuthDocument>, @InjectModel(Users.name) private userModel: Model<UsersDocument>) {}
    
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        const dataAndToken = this.generateToken(user)
        await this.saveToken((await dataAndToken).user, (await dataAndToken).token)
        return dataAndToken
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.create({...userDto, password: hashPassword})
        const dataAndToken = this.generateToken(user)
        await this.saveToken((await dataAndToken).user, (await dataAndToken).token)
        return dataAndToken
    }

    async refresh(token: string) {      
        if(!token) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
        }
        const userData = this.validateToken(token)
        // console.log(userData)
        const tokenFromDb = await this.findToken(token)
        // console.log(tokenFromDb) || !tokenFromDb
        if(!userData) { 
            throw new HttpException('Пользователь', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userModel.findById(userData.id)
        const tokens = this.generateToken(user)
        await this.saveToken((await tokens).user, (await tokens).token)
        return tokens
    } 

    async generateToken(user) {
        const payload = {email: user.email, id: user._id}
        const dataUser = await this.usersService.getOne(user._id)
        return {
            token: this.jwtService.sign(payload),
            user: user._id,
            dataUser: dataUser
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }

    validateToken(token: string) {
        try {
            const userData = this.jwtService.verify(token)
            return userData
        } catch(e) {
            return null
        }
    }

    async saveToken(userId, token: string) {
        const tokenData = await this.authModel.findOne({userId: userId})
        // console.log(tokenData)
        if(tokenData) {
            tokenData.token = token
            return tokenData.save()
        }
        const tok = await this.authModel.create({userId: userId, token})
        console.log(tok)
        return tok
    }

    async findToken(token: string) { 
        const tokenData = await this.authModel.findOne({token})
        return tokenData
    }
}