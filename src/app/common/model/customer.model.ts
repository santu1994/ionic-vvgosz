export interface CustomerSchema {
    is_verified: boolean;
    is_suspended: boolean;
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    dob: Date;
    gender: string;
    ph_number: string;
    createdAt: string;
    updatedAt: string;
    bid_balance: number;
    otp?: number;
}
