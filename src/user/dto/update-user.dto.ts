import {IsBoolean, IsInt, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
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