import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { JwtGuard } from './guard';


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

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtGuard)
    @Get('refresh-access-token')
    async refreshAccessToken(@Request() req) {
        return await this.authService.signedToken(req.user.id)
    }


    // @Get('validate')
    // validate_token(){}
    

}
