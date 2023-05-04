import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { Tokens, getMeUser } from './types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async signup(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password)

        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            })

            const tokens = await this.getTokens(newUser.id, newUser.email)

            await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken)

            return tokens    
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new BadRequestException('User with this email already exists')
                }
            }
        }
        
    }

    async signin(dto: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })

        if (!user) throw new ForbiddenException('Invalid Credentials')

        const isPasswordValid = await bcrypt.compare(dto.password, user.hash)

        if (!isPasswordValid) throw new ForbiddenException('Invalid Credentials')

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

        return tokens
    }
    async logout(userId: number) {
        this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })

        return { msg: "ok" }
    }

    async refreshToken(userId: number, refreshToken: string): Promise<Tokens> {
        if(!refreshToken) {
            throw new ForbiddenException('Unauthorized')
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ForbiddenException('Unauthorized')

        const isRefreshTokenValid = bcrypt.compare(refreshToken, user.hashedRt)

        if (!isRefreshTokenValid) throw new ForbiddenException('Unauthorized')

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRefreshTokenHash(userId, tokens.refreshToken)
        return tokens
    }


    async getMe(userId: number): Promise<getMeUser> {

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) throw new ForbiddenException('Unauthorized')

        return { id: user.id, email: user.email }
    }

    async updateRefreshTokenHash(userId: number, refreshToken: string) {
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

    async getTokens(userId: number, email: string): Promise<{ accessToken: string, refreshToken: string }> {
        const accessTokenPromise = this.jwt.signAsync({ sub: userId, email }, {
            secret: "120SJDHue9jiosdaml;1asdl;asdpeokSAJKLDjKAd",
            expiresIn: 60 * 15
        })

        const refreshTokenPromise = this.jwt.signAsync({ sub: userId, email }, {
            secret: '12u3oijsadnsaSalJSD2kSJLKd',
            expiresIn: '15d',
        })

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise])

        return { accessToken, refreshToken }
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }
}
