import { environment } from './environment';

const baseUrl = environment.baseUrl;

export const env = {
    userApi: `${baseUrl}/user`,
    fundWalletApi: `${baseUrl}/fund-wallet`,
    cunRateApi: `${baseUrl}/cun-rate`,
    transApi: `${baseUrl}/trans`,
    usersBankApi: `${baseUrl}/user-bank`,
    hostUrl: environment.hostUrl
};



