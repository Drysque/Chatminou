import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { riotConstants } from 'utils/constants';

import { RiotAuthService } from './auth.service';

const { userAgent, httpsAgent } = riotConstants;

@Module({
  imports: [
    HttpModule.register({
      headers: { 'Content-Type': 'application/json', 'User-Agent': userAgent },
      httpsAgent,
      timeout: 5000,
    }),
  ],
  providers: [RiotAuthService],
  exports: [RiotAuthService],
})
export class RiotAuthModule {}
