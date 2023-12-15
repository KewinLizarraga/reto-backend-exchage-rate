import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
    }).compile();
  });

  beforeEach(async () => {
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('generate token', () => {
    const tokenGenerate =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzAyNjYxNjU0fQ.4A5axOq_ZMPHCrYQz72z9ZJvMtXCCs_As1T5zAyTW1Y';

    it('registering currencies', () => {
      jest
        .spyOn(authService, 'generateToken')
        .mockImplementation(() => tokenGenerate);

      const token = authController.generateToken();

      expect(token).toEqual({ token: tokenGenerate });
    });
  });
});
