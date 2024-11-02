import { IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { MaxLengthArrayValidator } from '../validation/max-length-array.validator';
import { IClient } from 'src/client/interface/client.interface';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  capacity: number;

  @IsArray()
  @Validate(MaxLengthArrayValidator, ['Maximo clientes permitido'])
  clients?: IClient['id'][];
}
