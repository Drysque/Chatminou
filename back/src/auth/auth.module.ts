import { Module } from '@nestjs/common';

import { RiotAuthModule } from 'riot/auth/auth.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [RiotAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
