import { IsNumber } from 'class-validator';

export class CreateClientRestaurantDto {
  @IsNumber()
  client_id: number;

  @IsNumber()
  restaurant_id: number;
}
