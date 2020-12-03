import { CustomerSchema } from './customer.model';

export interface BidSchema {
  customer_id: string;
  status: string;
  note: string;
  coin: number;
  auction_id: string;
  product_id: string;
  price: number;
  customer_name?: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  customer_info?: CustomerSchema;
}
