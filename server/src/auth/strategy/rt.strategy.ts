import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '12u3oijsadnsaSalJSD2kSJLKd',
            passReqToCallback: true
        })
    }

    validate(req:Request ,payload: any){
        const refreshToken = req.get('authorization').replace('Bearer', '').trim()
        return { ...payload, refreshToken }
}
}