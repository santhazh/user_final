import RestClient from './RestClient';
import { OverstockRestConfig, defaultHeaders } from '../common/OverstockRestConfig';
import * as ApiConstants from './ApiConstants';
import UserDetail from '../json/db.json';

export function getUserlist (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_GET_USER}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.get(config)
        .then(json => json);
}

export function addNewUser (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_ADD_USER}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.post(config)
        .then(json => json);
}

export function updateUser (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_UPDATE_USER}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return UserDetail;
}

export function deleteUser (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_DELETE_USER}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.delete(config)
        .then(json => json);
}

export function multideleteUser (data) {
    const config = {};
    config.url = `${OverstockRestConfig.ApiConfig()}${ApiConstants.USER_MANAGEMENT_MULTI_DELETE_USER}`;
    config.headers = defaultHeaders;
    config.data = data.payload;

    return RestClient.delete(config)
        .then(json => json);
}

export default {
   getUserlist,
    addNewUser,
    updateUser,
    deleteUser,
    multideleteUser
};
