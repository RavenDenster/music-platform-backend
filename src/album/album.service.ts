import {Injectable} from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from "mongoose"
import { FileService, FileType } from "src/file/file.service"
import { Track, TrackDocument } from "src/track/schemas/track.schema"
import { Album, AlbumDocument } from "./album.schema"
import { AddTrackDto } from "./dto/add-track.dto"
import { CreateAlbumDto } from "./dto/create-album.dto"
import { RemoveTrackDto } from "./dto/remove-track.dto"

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>, @InjectModel(Track.name) private trackModel: Model<TrackDocument>, private fileService: FileService) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const album = await this.albumModel.create({...dto, picture: picturePath})
        return album
    }
    
    async getAll(): Promise<Album[]> {
        const album = await this.albumModel.find()
        return album
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await (await this.albumModel.findById(id)).populate('tracks') 
        return album
    }

    async addTrack(dto: AddTrackDto) {
        const track = await this.trackModel.findById(dto.trackId)
        const album = await this.albumModel.findById(dto.albumId) 
        album.tracks.push(track)
        await album.save()
        return track
    }

    async removeTrack(dto: RemoveTrackDto, id: string) {
        await this.albumModel.findByIdAndUpdate(id, dto, {new: true})
        const newAlbums = await (await this.albumModel.findById(id)).populate('tracks') 
        return newAlbums
    }
 
    async delete(id: ObjectId) {   
        const deleteAlbum = await this.albumModel.findById(id)
        await this.albumModel.findByIdAndDelete(id)
        this.fileService.removeFile(deleteAlbum.picture)
        const album = await this.albumModel.find()
        return album
    }
}