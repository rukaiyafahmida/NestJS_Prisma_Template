import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }

    @Patch()
    async editUser(@GetUser('id') userId: number, dto: EditUserDto){
        return this.userService.updateUser(userId, dto);
    }

}
