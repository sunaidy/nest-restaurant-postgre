import { IPagination } from '../../useful/interface/pagination.interface';
import { IClient } from '../../client/interface/client.interface';
import { IRestaurant } from '../../restaurant/interface/restaurant.interface';

export interface IOrder {
  id: number;
  client: IClient;
  restaurant: IRestaurant;
}

export interface IOrderList {
  data: IOrder[];
  meta: IPagination;
}
