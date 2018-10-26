import { takeLatest, put, call, all } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import * as SignInActionTypes from '../actionTypes/SigninActionTypes';
import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';
import SignInCase from '../api/SignInApi';
import history from '../history';
import { getEmailDomain } from '../common/Utils';

const GOVT_EMAIL_EXTENSION = ['.gov', '.mil', '.state', '.edu'];
function* SignIn(action) {
    try {
        const signInResponse = yield call(SignInCase, action);
        const { data } = signInResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: SignInActionTypes.SIGN_IN_ERROR, error: message });
        } else {
            const { isSignupDone } = data;
            if (isSignupDone) {
                yield put({ type: SignInActionTypes.SIGN_IN_SUCCESS, data });
            } else {
            Cookies.remove('signUpDetails');
            Cookies.set('signUpDetails', data);
            const { emailId = null, signupStage } = data;
            const getDomain = getEmailDomain(emailId);
            if (GOVT_EMAIL_EXTENSION.includes(getDomain)) {
                history.push('/gov');
                yield put({ type: ProfessionalActionTypes.CURRENT_STAGE, signupStage });
            } else {
                history.push('/professional');
                yield put({ type: ProfessionalActionTypes.CURRENT_STAGE, signupStage });
            }
            }
        }
    } catch (error) {
        yield all([
            put({ type: SignInActionTypes.SIGN_IN_ERROR, error }),
        ]);
    }
}

export default function* watchSignInSaga() {
    yield all([
        takeLatest(SignInActionTypes.SIGN_IN_REQUEST, SignIn),
    ]);
}
