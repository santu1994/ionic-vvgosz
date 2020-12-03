import { OrderSchema } from 'src/app/common/model/order.model';
import { ProductSchema } from 'src/app/common/model/product.model';


export interface CheckoutProductModel {
  msg: string;
  success: boolean;
  data: ProductSchema;
}

export interface OrderPaymentModel {
  msg: string;
  success: boolean;
  data: Array<OrderSchema>;
}
