import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body() dto: AuthDto): Promise<Tokens>{
        console.log(dto)
        return this.authService.signup(dto)
    }

    @Post('/signin')
    signin() { 
        this.authService.signin()
     }

    @Post('/logout')
    logout() { 
        this.authService.logout()
     }

    @Post('/refresh')
    refreshToken() { 
        this.authService.refreshToken() 
     }
}
