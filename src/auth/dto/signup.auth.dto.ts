import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator'

// Registration DTO
export class SignupRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    password: string
}