import { IsEmail, IsNumber, IsString, Min } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phone: number;

  @IsNumber()
  @Min(19, { message: 'The age must be greater than or equal to 19' })
  age: number;
}
