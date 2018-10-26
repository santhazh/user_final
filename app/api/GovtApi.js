import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';

export function getCategorysInGovt (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${ApiConstants.CATEGORY}${ApiConstants.GOVT_CATEGORIES}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.get(config)
        .then(json => json);
}

// export function govtCompanyInformation (data) {
//     const config = {};
//     config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${data.payload.id}`;
//     config.headers = defaultHeaders;
//     config.data = data.payload;

//     return RestClient.put(config)
//              .then(json => json);
// }

// export function govtShoppingPreferenceInformation (data) {
//     const config = {};
//     config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.B2B_CUSTOMER}${data.payload.id}`;
//     config.headers = defaultHeaders;
//     config.data = data.payload;

//     return RestClient.put(config)
//               .then(json => json);
// }

export default {
    getCategorysInGovt,
    // govtCompanyInformation,
    // govtShoppingPreferenceInformation
};
