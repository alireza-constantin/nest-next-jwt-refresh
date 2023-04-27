import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(){
        this.authService.signin()
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
