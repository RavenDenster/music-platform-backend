import {Injectable} from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from "mongoose"
import { Album, AlbumDocument } from "src/album/album.schema"
import { AddTrackUserDto } from "./dto/add-track-user.dto"
import { CreateUserDto } from "./dto/create-users.dto"
import { RemoveTrackUserDto } from "./dto/remove-track-user.dto"
import { Users, UsersDocument } from "./users.schema"

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>, @InjectModel(Album.name) private albumModel: Model<AlbumDocument>) {}
    
    async create(dto: CreateUserDto): Promise<Users> {
        const user = await this.usersModel.create({...dto})
        return user
    } 

    async getAll(): Promise<Users[]> {
        const users = await this.usersModel.find()
        return users
    }

    async getOne(id: ObjectId): Promise<Users> {
        const user = await (await this.usersModel.findById(id)).populate('albums') 
        return user
    }

    async addAlbum(dto: AddTrackUserDto) {
        const album = await this.albumModel.findById(dto.albumId)
        const user = await this.usersModel.findById(dto.userId) 
        user.albums.push(album)
        await user.save()
        return album
    }

    async removeAlbum(dto: RemoveTrackUserDto, id: string) {
        await this.usersModel.findByIdAndUpdate(id, dto, {new: true})
        const newTracks = await (await this.usersModel.findById(id)).populate('albums') 
        return newTracks
    }

    async delete(id: ObjectId) {   
        await this.usersModel.findByIdAndDelete(id)
        const users = await this.usersModel.find()
        return users
    }

    async getUserByEmail(email: string) {  
        const user = await this.usersModel.findOne({'email': email})
        return user
    }
}