import { Document } from 'mongoose';
import { preconditions } from '../enums/preconditions.enum';
export class Account extends Document {
  name: string;
  email: string;
  password: string;
  weight: number;
  height: number;
  bmi: number;
  gender: string;
  precondition: preconditions;
  otherDiseases: string;
}
