import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { AuthDto, MultifactorDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'xxxxxxxxxx', description: 'xxxxxxxxxx' })
  @ApiOkResponse({ description: 'xxxxxxxxxx' })
  @ApiInternalServerErrorResponse()
  @Post('login')
  login(@Body() { username, password }: AuthDto): Promise<any> {
    return this.authService.authorize(username, password);
  }

  @Post('mfa')
  validateAss(@Body() { code, cookie }: MultifactorDto) {
    return this.authService.validateMFACode(code, cookie);
  }
}
