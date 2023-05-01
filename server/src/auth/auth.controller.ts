import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens, getMeUser, jwtPayloadWithRt } from './types';
import { accessTokenGuard } from 'src/common/guards/at.guard';
import { refreshTokenGuard } from 'src/common/guards/rt.guard';
import { getCurrentUser, getCurrentUserId, Public,  } from 'src/common/decorators'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDto): Promise<Tokens>{
        console.log(dto)
        return this.authService.signup(dto)
    }

    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> { 
        return this.authService.signin(dto)

    }

    @Get('/me')
    @HttpCode(HttpStatus.OK)
    getMe(@getCurrentUserId() userId: number): Promise<getMeUser>{
        return this.authService.getMe(userId)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@getCurrentUserId() userId: number) {
        return this.authService.logout(userId)
     }

    @Public()
    @UseGuards(refreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @getCurrentUser('refreshToken') refreshToken: string,
        @getCurrentUserId() userId: number
    ): Promise<Tokens> { 
        return this.authService.refreshToken(userId, refreshToken) 
     }
}
