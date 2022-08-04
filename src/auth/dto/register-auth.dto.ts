import {IsEmail, IsNumber, IsOptional, IsString, Length, Matches} from "class-validator";

export class RegisterAuthDto {

    @IsString()
    @Length(2, 45)
    public userName: string;

    @IsString()
    @IsEmail()
    public email: string

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
    public password: string

}