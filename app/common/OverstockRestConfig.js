export class OverstockRestConfig {
    // static ApiConfig = () => 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2bcustomer/';

    static ApiConfig = () => 'http://192.168.4.92:8082/b2bcustomer/';

    // static ApiUploadConfig = () => 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:9090/b2b/';

    static FileUpoadCofig = () => 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:9090/b2bdocument';
}

export default OverstockRestConfig;

export const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
};

export const fileUploadHeaders = {
    'content-type': 'multipart/form-data'
};
