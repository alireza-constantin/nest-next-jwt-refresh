import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/isPublic.decorator";

@Injectable()
export class accessTokenGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super()
    }
    
    canActivate(ctx: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            ctx.getHandler(),
            ctx.getClass()
        ])

        if(isPublic) {
            return true
        }
        
        return super.canActivate(ctx)
    }
}