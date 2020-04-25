export interface UserI {
    _id: string;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    createdAt: Date;
    wallet: UserWalletI[];
}
export interface UserWalletI {
    name: string;
    symbol: string;
    sign: string;
    balance: number;
}
