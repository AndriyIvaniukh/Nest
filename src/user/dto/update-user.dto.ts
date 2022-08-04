import {IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2,45)
    public userName?: string;

    @IsOptional()
    @IsNumber()
    @IsInt()
    @Max(120)
    @Min(1)
    public age?: number;

    @IsOptional()
    @IsBoolean()
    public status?: boolean;
}