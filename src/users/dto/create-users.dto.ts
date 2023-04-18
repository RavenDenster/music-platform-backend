import { IsEmail, IsByteLength } from "class-validator";


export class CreateUserDto {
    @IsEmail({}, {message: 'некорректный email'})
    readonly email;
    @IsByteLength(5, 20)
    readonly password;
}

