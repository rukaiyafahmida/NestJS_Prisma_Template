import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('signup')
    async signup(@Body() dto : SignupRequestDto){
        return await this.authService.signup(dto);
    }

    @Post('signin')
    async signin(@Body() dto : SigninRequestDto){
        return await this.authService.signin(dto);
    }

    @Get('refresh')
    refresh_token(){}
    
    @Get('validate')
    validate_token(){}
    

}
