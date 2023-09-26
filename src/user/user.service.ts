import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma : PrismaService){}

    async updateUser(userId: number, dto: EditUserDto){
        try{
            const user = await this.prisma.user.update({
                where:{
                    id: userId,
                },
                data: {
                    ...dto
                }
            });
            delete user.hash;
            return user;
            
        }catch(error){
            throw new BadRequestException("Error editing user.");
        }
    }



}
