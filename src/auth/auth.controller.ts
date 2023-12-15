import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Generate Token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate-token')
  generateToken() {
    return { token: this.authService.generateToken() };
  }
}
