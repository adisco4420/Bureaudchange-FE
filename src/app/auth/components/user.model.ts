export interface UserI {
    _id: string;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    createdAt: Date;
    wallet: UserWalletI[];
    bankAccounts?: UserBankActI;
}
export interface UserWalletI {
    name: string;
    symbol: string;
    sign: string;
    balance: number;
}
export interface UserBankActI {
    currency: string;
    bankName: string;
    accountNo: string;
    accountName: string;
}
