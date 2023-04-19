import {Injectable, HttpException, HttpStatus} from "@nestjs/common"
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService{
    createFile(type: FileType, file): string {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..', 'static', type)
            console.log(__dirname, fileName, filePath)
            if(!fs.existsSync(filePath)) {
                console.log('before mkdir')
                // fs.mkdirSync(filePath, {recursive: true})
                fs.mkdir(filePath, {recursive: true}, (err) => {
                    if (err) {
                        return console.log(err)
                    }
                })
                console.log('after mkdir')
            }
            console.log(file.buffer)
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            console.log(type + '/' + fileName)
            return type + '/' + fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(fileName: string) {
        try {
           const audioOrImage = fileName.split('/').shift()
           const nameFile = fileName.split('/').pop()
           fs.unlinkSync(path.join(__dirname, '..', 'static', audioOrImage, nameFile))
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }     
    }
}