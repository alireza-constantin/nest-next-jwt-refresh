import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                const refreshToken = req.cookies['jid']
                console.log(refreshToken, 'rt strategy')
                if(!refreshToken) return null
                return refreshToken
            }]),
            secretOrKey: '12u3oijsadnsaSalJSD2kSJLKd',
            passReqToCallback: true
        })
    }


    validate(req:Request ,payload: any){
        
        const refreshToken = req.cookies['jid']
        return { ...payload, refreshToken }
}
}