import { ProductSchema } from 'src/app/common/model/product.model';


export interface GetCustomerProductModel {
    msg: string;
    success: boolean;
    data: {
        recordsTotal: number;
        data: Array<ProductSchema>
    };
}

export interface GetAuctionProductModel {
    msg: string;
    success: boolean;
    data: {
        close: Array<ProductSchema>;
        live: Array<ProductSchema>;
        upcoming: Array<ProductSchema>;
    };
}