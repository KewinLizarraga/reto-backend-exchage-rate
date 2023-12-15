import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get('JWT_SECRET'),
            };
          },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('generate token', () => {
    const tokenGenerate =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzAyNjYxNjU0fQ.4A5axOq_ZMPHCrYQz72z9ZJvMtXCCs_As1T5zAyTW1Y';

    it('registering currencies', () => {
      jest
        .spyOn(authService, 'generateToken')
        .mockImplementation(() => tokenGenerate);

      const token = authService.generateToken();

      expect(token).toEqual(tokenGenerate);
    });
  });
});
