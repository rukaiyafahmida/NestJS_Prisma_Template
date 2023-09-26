import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto, TokenResponseDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService,
                private jwt : JwtService,
                private config : ConfigService){}


    async signup(dto : SignupRequestDto){
        const hashed_password = await argon.hash(dto.password);
        try{       
            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    name: dto.name,
                    hash: hashed_password
                }
            });
        return await this.signedToken(user.id);

        }catch(error){
            if((error instanceof PrismaClientKnownRequestError) 
                && (error.code == 'P2002') )
                throw new ForbiddenException('Credentials Taken.');

            throw error;
        }
    }

    async signin(dto : SigninRequestDto){
        const user = await this.prisma.user.findFirst({
            where:{
                email: dto.email,
            },
        });
        
        if(!user)
            throw new ForbiddenException("Incorrect Credentials");

        const match= await argon.verify(user.hash, dto.password);
        if(!match)
            throw new ForbiddenException("Incorrect Credentials");
        
        return await this.signedToken(user.id);
    }

    async signedToken(userId: number): 
    Promise<{access_token: string, refresh_token: string}>{

        const payload = {
            sub : userId
        }
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: this.config.get("ACCESS_TOKEN_EXPIRES_IN"),
            secret: this.config.get("JWT_SECRET")
        });
        const refresh_token =  await this.jwt.signAsync(payload, {
            expiresIn: this.config.get("REFRESH_TOKEN_EXPIRES_IN"),
            secret: this.config.get("JWT_SECRET")
        })
    
        return {access_token: access_token, refresh_token: refresh_token};
        }

}
