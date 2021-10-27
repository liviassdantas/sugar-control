import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AccountService } from '../accounts/accounts.service';
import mockToken from '../_mocks_/mockToken.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [
        {
          provide: AccountService,
          useValue: {
            sign: jest.mock,
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = modRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access-token', async () => {
    const mock = mockToken();
    jest.spyOn(service, 'signin').mockImplementation(() =>
      Promise.resolve({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTY5NjY4NjgsImV4cCI6MTYxNjk2NjkyOH0.b2eefmnnwc0SN8ZDFy4OB8HwtiYcgAG72sHB6DWwhL0',
      }),
    );

    const authResponse = await service.signin({
      email: 'user@user.com',
      _id: '2145',
    });
    const receive_token = authResponse;
    expect(receive_token).toEqual(mock);
  });
});
