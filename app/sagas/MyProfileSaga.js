import { takeLatest, put, call, all } from 'redux-saga/effects';
import getProfile from '../api/MyProfileApi';
import * as GetProfileActionTypes from '../actionTypes/MyProfileActionTypes';

function* getRole(action) {
    try {
        const getUsersResponse = yield call(getProfile, action);
        const { data } = getUsersResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: GetProfileActionTypes.GET_PROFILE_ERROR, error: message });
        } else {
            yield put({ type: GetProfileActionTypes.GET_PROFILE_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: GetProfileActionTypes.GET_PROFILE_ERROR, error }),
        ]);
    }
}

export default function* watchMyProfileSaga() {
    yield all([
        takeLatest(GetProfileActionTypes.GET_PROFILE_REQUEST, getRole),
    ]);
}
