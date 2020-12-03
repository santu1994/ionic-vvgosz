import { CurrencySchema } from './currency.model';

export interface AdminSchema {
  is_active: boolean;
  role: number;
  _id: string;
  name: string;
  email: string;
  logo: string;
  currency: string;
  time_zone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  loginType: string;
}

export interface AdminCurrencySchema {
  is_active: boolean;
  role: number;
  _id: string;
  name: string;
  email: string;
  logo: string;
  currency: CurrencySchema;
  time_zone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  loginType: string;
}
