import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsNumber()
  client_id: number;

  @IsNumber()
  restaurant_id: number;
}
