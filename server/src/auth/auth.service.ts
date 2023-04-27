import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
    
    async signin(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password)

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

        const { at, rt } = await this.getTokens(user.id, user.email)
        return { refreshToken: rt, accessToken: at }
    }
    signup() {}
    logout() {}
    refreshToken() {}

    async getTokens(userId: number, email: string) :Promise<{at: string, rt: string}>{
        const accessToken = this.jwt.signAsync({ sub: userId, email }, {
            secret: "120SJDHue9jiosdaml;1asdl;asdpeokSAJKLDjKAd",
            expiresIn: 60 * 15 
        })

        const refreshToken = this.jwt.signAsync({ sub: userId, email }, {
            secret: '12u3oijsadnsaSalJSD2kSJLKd',
            expiresIn: '15d'
        })

        const [at, rt] = await Promise.all([accessToken, refreshToken])

        return {at, rt}
    }

    hashData(data: string){
        return bcrypt.hash(data, 10)
    }
}
