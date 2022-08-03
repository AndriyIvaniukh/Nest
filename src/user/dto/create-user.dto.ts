import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsNumber,
    IsString,
    Length,
    Matches,
    Max,
    Min,
} from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(2,45)
    public userName : string;

    @IsString()
    @IsEmail()
    public email: string;

    @IsNumber()
    @IsInt()
    @Max(120)
    @Min(1)
    public age: number;

    @IsBoolean()
    public status: boolean;

    @Matches(/^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*[\\d])+)(?=(.*[\\W])+)(?!.*\\s).{8,}$/)
    private password: string;
}