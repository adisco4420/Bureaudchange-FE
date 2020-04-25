import { TransI } from './../models/trans.model';
import currencyUtil from './currency.util';

class TransUtils {
    getText(data: TransI) {
        const payCunSign = currencyUtil.getCunBySymbol(data.payCun).sign;
        const recieveCunSign = currencyUtil.getCunBySymbol(data.recieveCun).sign;
        let result = '';
        if (data.type === 'exchange') {
            const amount = this.commas(Number(data.amount / data.exchangeRate).toFixed(2));
            result = `Exchange ${payCunSign}${this.commas(data.amount)} to ${recieveCunSign}${amount}`;
        } else if (data.type === 'deposit') {
            result = `Topped up wallet via ${data.source}`;
        } else {
            result = `Withdraw fund to ${data.source}`;
        }
        return result;
    }
    commas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
export default new TransUtils();
