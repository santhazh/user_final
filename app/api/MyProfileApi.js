// import RestClient from './RestClient';
// import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
// import * as ApiConstants from './ApiConstants';
import userDetail from '../json/userDetail.json';

export default function getProfile (data) {
    const config = {};
    // config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.CUSTOMER_SIGNUP}`;
    // config.headers = defaultHeaders;
    config.data = data.payload;

    return { data: userDetail };
}
