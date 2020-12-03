import { CustomerSchema } from 'src/app/common/model/customer.model';


export interface CustomerModel {
    msg: string;
    success: boolean;
    data: {
        user: CustomerSchema;
        token?: string;
        otp?: string;
    };
}

export interface RegistrationCustomerModel {
    msg: string;
    success: boolean;
    data: CustomerSchema;
}