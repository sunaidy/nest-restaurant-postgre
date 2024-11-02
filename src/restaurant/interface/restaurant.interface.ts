import { IPagination } from '../../pagination/interface/pagination.interface';
import { IClient } from '../../client/interface/client.interface';

export interface IRestaurant {
  id: number;
  name: string;
  address: string;
  capacity: number;
  clients?: IClient['id'][];
}

export interface IRestaurantList {
  data: IRestaurantResponse[];
  meta: IPagination;
}

export interface IRestaurantResponse {
  id: number;
  name: string;
  address: string;
  capacity: number;
  clients?: object;
}
