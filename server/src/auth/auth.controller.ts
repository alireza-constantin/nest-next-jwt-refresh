import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AccessToken, getMeUser } from './types';
import { refreshTokenGuard } from 'src/common/guards/rt.guard';
import { getRefreshToken, getCurrentUserId, Public, } from 'src/common/decorators'
import { CookieOptions, Response } from 'express';
import { REFRESH_TOKEN_MAX_AGE, __isProd__ } from 'src/common/constants';



const cookieOptions = {
    httpOnly: true,
    secure: __isProd__ ? true : false,
    expires: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE),
} satisfies CookieOptions


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<AccessToken & getMeUser> {
        const data = await this.authService.signup(dto);
        res.cookie('jid', data.refreshToken, cookieOptions)
        return { accessToken: data.accessToken, email: data.email, id: data.id }
    }

    @Public()
    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signin(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<AccessToken & getMeUser> {
        console.log(dto)
        const data = await this.authService.signin(dto)
        res.cookie('jid', data.refreshToken, cookieOptions)
        return { accessToken: data.accessToken, email: data.email, id: data.id }
    }

    @Get('/me')
    @HttpCode(HttpStatus.OK)
    getMe(@getCurrentUserId() userId: number): Promise<getMeUser> {
        return this.authService.getMe(userId)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @getCurrentUserId() userId: number,
        @Res({ passthrough: true }) res: Response
    ) {
        res.cookie('jid', '', {
            httpOnly: true,
            secure: __isProd__ ? true : false,
        })
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(refreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @getRefreshToken('jid') refreshToken: string,
        @getCurrentUserId() userId: number,
        @Res({ passthrough: true }) res: Response
    ): Promise<AccessToken> {
        const tokens = await this.authService.refreshToken(userId, refreshToken)
        res.cookie('jid', tokens.refreshToken, {
            httpOnly: true,
            secure: __isProd__ ? true : false,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // set cookie to expire in 15 days
        })
        return { accessToken: tokens.accessToken }
    }
}
