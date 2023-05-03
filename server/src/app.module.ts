import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from './common/guards/at.guard';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot() ,PrismaModule, AuthModule],
  providers: [{
    provide: APP_GUARD,
    useClass: accessTokenGuard
  }]
})
export class AppModule {}
