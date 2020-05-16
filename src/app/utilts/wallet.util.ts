class WalletUtility {
    WithdrawRate(payload: {currency: string, amount: number}): number {
        let rate = 100;
        switch (payload.currency) {
            case 'NGN':
                rate = 100;
                break;
            case 'CNY':
                rate = 50;
                break;
            case 'AED':
                rate = 20;
                break;
            case 'USD': case 'EUR': case 'GBP':
                rate = 3;
                break;
            default:
                break;
        }
        return rate;
    }
}

export default new WalletUtility();
