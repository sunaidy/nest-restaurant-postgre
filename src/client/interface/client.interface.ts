import { IPagination } from '../../useful/interface/pagination.interface';

export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: number;
  age: number;
}

export interface IClientList {
  data: IClient[];
  meta: IPagination;
}
