import { CustomerAddressSchema } from './customerAddress.model';
import { OrderStatusSchema } from './orderStatus.model';
import { ProductSchema } from './product.model';

export interface OrderSchema {
  _id: string;
  customer_id: string;
  product_id: string;
  order_group_id: string;
  address_id: string;
  address_info: CustomerAddressSchema;
  history: Array<{
    order_status_id: string;
    order_date: string;
  }>;
  history_details?: Array<{
    order_status_id: OrderStatusSchema;
    order_date: string;
    _id: string;
  }>;
  products_info?: ProductSchema;
  paid_amount: number;
  expected_delivery: string;
  tracking_ref: string;
  payment_method: string;
  createdAt: string;
  updatedAt: string;
}



