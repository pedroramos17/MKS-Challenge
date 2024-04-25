import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            getProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in', async () => {
      const signInDto = {
        email: 'test-email',
        password: 'test-password',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue({ access_token: 'test-access-token' });

      const response = await authService.signIn(
        signInDto.email,
        signInDto.password,
      );

      expect(response).toBeDefined();
      expect(response).toHaveProperty('access_token');
      expect(response.access_token).toEqual('test-access-token');
    });

    it('should throw error when try put invalid credential', async () => {
      const signInDto = {
        email: 'invalid-test-email',
        password: 'invalid-test-password',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValue(new UnauthorizedException('Invalid Credentials'));

      await expect(
        authService.signIn(signInDto.email, signInDto.password),
      ).rejects.toThrow(new UnauthorizedException('Invalid Credentials'));
    });
  });
});
