import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken() {
    const payload = {
      role: 'client',
    };
    const token = this.jwtService.sign(payload, {
      secret: 'MySecretJWT@$3213$',
    });
    return token;
  }
}
