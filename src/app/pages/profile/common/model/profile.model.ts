import { BidSchema } from 'src/app/common/model/bid.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import { OrderSchema } from 'src/app/common/model/order.model';

export interface CustomerAddressModel {
    msg: string;
    success: boolean;
    data: CustomerAddressSchema;
}

export interface GetCustomerAddressModel {
    msg: string;
    success: boolean;
    data: Array<CustomerAddressSchema>;
}

export interface GetCustomerModel {
    msg: string;
    success: boolean;
    data: CustomerSchema;
}

export interface PasswordCheckModel {
    msg: string;
    success: boolean;
    data: number;
}

export interface PasswordCommonModel {
    msg: string;
    success: boolean;
    data: string;
}

export interface MyBidModel {
    _id: string;
    total: number;
    bid: BidSchema;
    product: {
        name: string;
        images: Array<string>;
        required_bid_credit: number;
        auction_end_date: string;
        last_bid_customer_id: string;
    };
}

export interface GetMyBidModel {
    msg: string;
    success: boolean;
    data: {
        bid: Array<MyBidModel>
        recordsTotal: number
    };
}

export interface GetMyOrderModel {
    msg: string;
    success: boolean;
    data: {
        order: Array<OrderSchema>
        recordsTotal: number
    };
}

export interface GetOrderDetailsModel {
    msg: string;
    success: boolean;
    data: OrderSchema;
}