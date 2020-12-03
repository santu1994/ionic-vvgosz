import { LoginInfoSchema } from './loginLog.model';
import { CategoryModel } from './category.model';

export interface SellerInfoSchema {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  gst_number: string;
  registration_number: string;
  address: string;
  pin: string;
  image: string;
  business_doc: string;
  product_upload_limit: number;
  user_name: string;
  password: string;
  category: Array<{
    category_id: string;
    _id: string;
  }>;
  valid_till: Date;
  banking_details: {
    holder_name: string;
    account_number: string;
    other_details: string;
  };
  merchant_details: Array<{
    _id: string;
    name: string;
    id: string;
    secret_key: string;
    default: boolean;
  }>;
  is_verified: boolean;
  is_active: boolean;
  _id: string;
  is_delete: boolean;
  deleted_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerInfoLoginInoSchema {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  gst_number: string;
  registration_number: string;
  address: string;
  pin: string;
  image: string;
  business_doc: string;
  product_upload_limit: number;
  user_name: string;
  password: string;
  category: Array<{
    category_id: string;
    _id: string;
  }>;
  valid_till: Date;
  banking_details: {
    holder_name: string;
    account_number: string;
    other_details: string;
  };
  merchant_details: Array<{
    _id: string;
    name: string;
    id: string;
    secret_key: string;
    default: boolean;
  }>;
  is_verified: boolean;
  is_active: boolean;
  _id: string;
  is_delete: boolean;
  deleted_date: string;
  createdAt: string;
  updatedAt: string;
  login_log: Array<LoginInfoSchema>;
  categories: Array<CategoryModel>;
}

