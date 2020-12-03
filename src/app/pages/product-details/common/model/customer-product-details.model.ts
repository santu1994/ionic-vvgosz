import { ProductSchema } from 'src/app/common/model/product.model';
import { BidSchema } from 'src/app/common/model/bid.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';


export interface GetProductDetailsModel {
  msg: string;
  success: boolean;
  data: {
    product: ProductSchema,
    status: string
  };
}

export interface GetBidHistoryModel {
  msg: string;
  success: boolean;
  data: Array<BidSchema>;
}

export interface BidNowModel {
  msg: string;
  success: boolean;
  data: {
    bidData: BidSchema,
    customerInfo: CustomerSchema,
    reset_time: string;
    set_end_date: string;
  };
}
