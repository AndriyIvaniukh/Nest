import {IsEmail, IsString, Matches} from "class-validator";

export class LoginAuthDto{
    @IsString()
    @IsEmail()
    public email: string

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
    public password: string
}