import { Module } from "@nestjs/common";
import { ZeroController } from "./zero.contoller";
import { ZeroService } from "./zero.service";


@Module({
    controllers: [ZeroController], 
    providers: [ZeroService], 
})
export class ZeroModule {}