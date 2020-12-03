import { SellerInfoSchema } from './sellerInfo.model';
import { SubCategoryModel } from './category.model';
import { AuctionTypeModel } from 'src/app/common/model/auctionType.model';
import { BidSchema } from './bid.model';
import { OrderSchema } from './order.model';

export interface ProductSchema {
  attribute: Array<{
    attribute: string;
    createdAt: string;
    slug: Array<string>;
    updatedAt: string;
    _id: string;
  }>;
  brand_name: string;
  category_id: string;
  createdAt: string;
  description: string;
  discount_type: string;
  featured: boolean;
  fees: { processing_fees: string; shipping_fees: string; };
  group: string;
  hot_sale: boolean;
  images: Array<string>;
  is_active: boolean;
  is_charity: boolean;
  name: string;
  offer_price: number;
  price: number;
  product_type: string;
  quantity: number;
  seller_id: string;
  short_description: string;
  sub_category_id: string;
  updatedAt: string;
  variant: Array<{
    attribute: string;
    slug: string;
    _id: string;
  }>;
  _id: string;
  seller_info: SellerInfoSchema;
  auction: {
    auction_id: string;
    auction_type: string;
    reset_time: number;
    required_bid_credit: number;
    start_price: number;
    start_date: string;
    end_date: string;
    set_end_date: string;
    left_date?: number;
  };
  categories: SubCategoryModel;
  auction_type?: Array<AuctionTypeModel>;
  bid_info?: Array<BidSchema>;
  is_unavailable?: boolean;
  status?: string;
  product_price?: number;
  is_order: boolean;
  payment_expiry_time?: number;
  order_history: Array<OrderSchema>;
}


