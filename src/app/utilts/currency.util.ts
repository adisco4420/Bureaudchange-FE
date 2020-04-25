import { CurrencyI } from "../shared/wallet.service";

class CurrencyUtil {
    getAllCurrency(): CurrencyI[] {
        return [
          { name: 'British Pound', symbol: 'GBP', sign: '£', flagName: 'united-kingdom'},
          { name: 'US Dollar', symbol: 'USD', sign: '$', flagName: 'united-states-of-america'},
          { name: 'European Euro', symbol: 'EUR', sign: '€', flagName: 'england'},
          { name: 'Nigerian Naira', symbol: 'NGN', sign: '₦', flagName: 'nigeria'},
          { name: 'UAE Dirham', symbol: 'AED', sign: '	د.إ', flagName: 'united-arab-emirates'},
          { name: 'Chinese Yuan', symbol: 'CNY', sign: '¥', flagName: 'china'},
          // { name: 'Ghanian Cedi', symbol: 'GHS', sign: '₵', flagName: 'ghana'},
        ];
      }
      getCunBySymbol(symbol): {sign: string, name: string, flagName: string} {
        const data = {
          USD: {sign: '$', name: 'US Dollar', flagName: 'united-states-of-america'},
          GBP: {sign: '£', name: 'British Pound', flagName: 'united-kingdom'},
          NGN: {sign: '₦', name: 'Nigerian Naira', flagName: 'nigeria'},
          EUR: {sign: '€', name: 'European Euro', flagName: 'england'},
          AED: {sign: 'د.إ', name: 'UAE Dirham', flagName: 'united-arab-emirates'},
          CNY: {sign: '¥', name: 'Chinese Yuan', flagName: 'china'},
        };
        return data[symbol] || {};
      }
}
export default new CurrencyUtil();
