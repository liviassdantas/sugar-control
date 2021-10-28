import { Module } from '@nestjs/common';
import { AccountService } from './patients.service';
import { AccountController } from './patients.controller';
import { AccountSchema } from '../models/schema/AccountSchema.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
