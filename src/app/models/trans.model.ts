export interface TransI {
    amount: number;
    date: Date;
    payCun: string;
    recieveCun: string;
    source: 'card' | 'bank-transfer' | 'wallet';
    status: 'pending' | 'success' | 'failed';
    type: 'exchange' | 'deposit' | 'withdraw';
    userEmail: string;
    exchangeRate: number;
}
