import { Injectable } from "@nestjs/common";
import { JwtService as JWT } from "@nestjs/jwt";

@Injectable()
export class JwtService{
    private readonly jwt : JWT
    constructor(jwt : JWT){
        this.jwt = jwt
    }

    
}