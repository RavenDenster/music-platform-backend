import { Controller, Get } from "@nestjs/common";
import { ZeroService } from "./zero.service";

@Controller('/')
export class ZeroController {
    constructor(private zeroService: ZeroService ) {}
    @Get()
    getAll() { 
        return this.zeroService.get()
    }
}