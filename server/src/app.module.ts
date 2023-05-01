import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from './common/guards/at.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [{
    provide: APP_GUARD,
    useClass: accessTokenGuard
  }]
})
export class AppModule {}
