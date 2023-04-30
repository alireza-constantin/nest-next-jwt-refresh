import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
    
    async signup(dto: AuthDto) {
        const hash = await this.hashData(dto.password)

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

        const { accessToken, refreshToken } = await this.getTokens(newUser.id, newUser.email)

        await this.updateRefreshTokenHash(newUser.id, refreshToken)
        return { refreshToken, accessToken }
    }
    
    async signin() {
    }
    logout() {}
    refreshToken() {}


    async updateRefreshTokenHash(userId: number, refreshToken: string){
        const hash = await this.hashData(refreshToken)
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: refreshToken
            }
        })
    }

    async getTokens(userId: number, email: string) :Promise<{accessToken: string, refreshToken: string}>{
        const accessTokenPromise = this.jwt.signAsync({ sub: userId, email }, {
            secret: "120SJDHue9jiosdaml;1asdl;asdpeokSAJKLDjKAd",
            expiresIn: 60 * 15 
        })

        const refreshTokenPromise = this.jwt.signAsync({ sub: userId, email }, {
            secret: '12u3oijsadnsaSalJSD2kSJLKd',
            expiresIn: '15d'
        })

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise])

        return {accessToken, refreshToken}
    }

    hashData(data: string){
        return bcrypt.hash(data, 10)
    }
}
