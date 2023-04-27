import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
