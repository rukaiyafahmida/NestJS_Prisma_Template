// for a class of AuthGuard so can be used
// as a dependency injection

import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    }
}