import { takeLatest, put, call, all } from 'redux-saga/effects';
import SignUpCase from '../api/SignUpApi';
import * as signUpActionTypes from '../actionTypes/SignUpActionTypes';


function* SignUp(action) {
    try {
        const signUpResponse = yield call(SignUpCase, action);
        const { data } = signUpResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: signUpActionTypes.SIGN_UP_ERROR, error: message });
        } else {
            yield put({ type: signUpActionTypes.SIGN_UP_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: signUpActionTypes.SIGN_UP_ERROR, error }),
        ]);
    }
}

export default function* watchSignUpSaga() {
    yield all([
        takeLatest(signUpActionTypes.SIGN_UP_REQUEST, SignUp),
    ]);
}
