import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { preconditions } from '../enums/preconditions.enum';

export abstract class BodyInfoDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  height: number;

  @IsNumber()
  @ApiProperty()
  bmi: number; //imc - indíce de massa corporal

  @IsNotEmpty()
  @IsString()
  @Length(1)
  @ApiProperty()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  precondition: preconditions;

  @IsString()
  @ApiProperty()
  otherDiseases: string;
}
