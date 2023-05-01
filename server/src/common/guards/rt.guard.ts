import { AuthGuard } from "@nestjs/passport";

export class refreshTokenGuard extends AuthGuard("jwt-rt"){
    constructor(){
        super()
    }
}