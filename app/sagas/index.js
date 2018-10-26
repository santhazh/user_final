import { fork } from 'redux-saga/effects';
import watchSignInSaga from './SignInSaga';
import watchSignUpSaga from './SignUpSaga';
import watchGovtSaga from './GovtSaga';
import watchProfessionalSaga from './ProfessionalSaga';
import watchusermanagementSaga from './UserManagementSaga';
import watchMyProfileSaga from './MyProfileSaga';

export default function* rootSagas() {
    yield* [
        fork(watchSignInSaga),
        fork(watchSignUpSaga),
        fork(watchGovtSaga),
        fork(watchProfessionalSaga),
        fork(watchusermanagementSaga),
        fork(watchMyProfileSaga)
    ];
}
