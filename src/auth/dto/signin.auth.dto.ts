import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
} from 'class-validator'

// Login DTO
export class SigninRequestDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string
}
