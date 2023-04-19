import {Injectable} from "@nestjs/common"


@Injectable()
export class ZeroService {

    constructor() {}
    
    async get() {
        return 'Hello'
    }

}