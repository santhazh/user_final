import * as MyProfileActionTypes from '../actionTypes/MyProfileActionTypes';

export const MyProfileRequest = values => ({
    type: MyProfileActionTypes.GET_PROFILE_REQUEST,
    payload: values,
});

export default {
    MyProfileRequest,
};
