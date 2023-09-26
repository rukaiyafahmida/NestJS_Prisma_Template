import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }

}
