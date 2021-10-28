import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../patients/patients.service';
import { ValidateSecurity } from '../utils/security.util';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signin(accountUser: any) {
    const result = await this.validateAccount(
      accountUser.email,
      accountUser.password,
    );

    const payload = { email: result.email, sub: result.id, name: result.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getEmailByToken(token: string) {
    const authorization = token.split(' ')[1].toString();
    const verifiedToken = this.jwtService.verify(authorization, {
      secret: jwtConstants.secret,
    });
    return verifiedToken.email;
  }

  async validateAccount(accountEmail: string, accountPassword: string) {
    const accountFound = await this.accountService.findByEmail(accountEmail);
    if (accountFound == null) {
      throw new InternalServerErrorException('Invalid email or password');
    }

    const passwordChecked = await ValidateSecurity.comparePassword(
      accountPassword,
      accountFound.password,
    );

    if (passwordChecked) {
      const { _id, name, email } = accountFound;
      return { id: _id, name, email };
    }
  }

  async getLoggedUserEmail(req) {
    const userEmail = await this.getEmailByToken(req.headers.authorization);
    return userEmail;
  }
}
