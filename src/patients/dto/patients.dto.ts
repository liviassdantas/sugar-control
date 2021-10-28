import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { BodyInfoDTO } from './body-informations..dto';

export class PatientsDTO extends BodyInfoDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty()
  password: string;
}
