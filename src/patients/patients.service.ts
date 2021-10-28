import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './entities/Patients.entities';
import { PatientsDTO } from './dto/patients.dto';
import { ValidateSecurity } from '../utils/security.util';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account')
    private readonly accountmodel: Model<Account>,
  ) {}

  async create(createAccountsDto: CreateAccountsDto): Promise<any> {
    const newAccount = new this.accountmodel(createAccountsDto);
    const { password } = newAccount;
    newAccount.password = await ValidateSecurity.generateHash(password, 10);

    const emailExists = await this.checkEmail(newAccount.email);

    if (!emailExists) {
      newAccount.accountBalance = 1000;
      await newAccount.save();
      return {
        status: 200,
        message: 'The new account has been created!',
      };
    } else {
      return {
        status: 403,
        message: 'The account already exists.',
      };
    }
  }

  private async checkEmail(email: string): Promise<boolean> {
    const result = await this.findByEmail(email);
    if (result != null) {
      return true;
    } else {
      return false;
    }
  }

  async findByEmail(email: string): Promise<Account> {
    const user = await this.accountmodel.findOne({ email });
    return user;
  }

  async findByID(id: string) {
    const { email } = await this.accountmodel.findOne({ id });
    return email;
  }
  async verifyBalance(loggedEmail, amount) {
    const account = await this.findByEmail(loggedEmail);

    if (account.accountBalance > amount) {
      const newValue = account.accountBalance - amount;
      await this.accountmodel.updateOne(
        { email: loggedEmail },
        { accountBalance: newValue },
      );
      return {
        status: 'ok',
      };
    } else {
      return {
        message: 'Insufficient funds.',
      };
    }
  }
  async updateAmount(originEmail, targetEmail, amount) {
    try {
      const verifyOriginBalance = await this.verifyBalance(originEmail, amount);

      if (verifyOriginBalance.status == 'ok') {
        const account = await this.findByEmail(targetEmail);

        const newValue = account.accountBalance + amount;
        await this.accountmodel.updateOne(
          { email: targetEmail },
          { accountBalance: newValue },
        );

        return {
          status: 'ok',
        };
      } else {
        return {
          status: 'failed',
          message: verifyOriginBalance.message,
        };
      }
    } catch (exception) {
      return {
        status: 'failed',
        message: exception.message,
      };
    }
  }

  async disccountWithdraw(originEmail, amount) {
    try {
      const verifyOriginBalance = await this.verifyBalance(originEmail, amount);

      if (verifyOriginBalance.status == 'ok') {
        const account = await this.findByEmail(originEmail);

        const newValue = account.accountBalance + amount;
        await this.accountmodel.updateOne(
          { email: originEmail },
          { accountBalance: newValue },
        );

        return {
          status: 'ok',
        };
      } else {
        return {
          status: 'failed',
          message: verifyOriginBalance.message,
        };
      }
    } catch (exception) {
      return {
        status: 'failed',
        message: exception.message,
      };
    }
  }
}
