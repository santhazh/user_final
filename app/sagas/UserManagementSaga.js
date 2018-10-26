import { takeLatest, put, call, all } from 'redux-saga/effects';
// import _isEmpty from 'lodash/isEmpty';
import { getUserlist, addNewUser, updateUser, deleteUser, multideleteUser } from '../api/UserManagementApi';
import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';

function* getUsers(action) {
    try {
        debugger;
        const getUsersResponse = yield call(getUserlist, action);
        const { data } = getUsersResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_ERROR, error: message });
        } else {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_ERROR, error }),
        ]);
    }
}

function* addNewUsers(action) {
    try {
        const addUsersResponse = yield call(addNewUser, action);
        const getUsersResponse = yield call(getUsers, {
            payload: {},
            type: 'USER_MANAGEMENT_MEMBERS_LIST_REQUEST'
        });
        const { addData } = addUsersResponse;
        const { data } = getUsersResponse;
        if (addData.error) {
            const { message } = addData;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_ERROR, error: message });
        } else {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_ERROR, error }),
        ]);
    }
}

function* UpdateUsersPermission(action) {
    try {
        const getUsersResponse = yield call(updateUser, action);
        console.log('getUsersResponse%%%', getUsersResponse);
        const { data } = getUsersResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_ERROR, error: message });
        } else {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_ERROR, error }),
        ]);
    }
}

function* DeleteUsersPermission(action) {
    try {
        const deleteUsersResponse = yield call(deleteUser, action);
        const getUsersResponse = yield call(getUsers, {
            payload: {},
            type: 'USER_MANAGEMENT_MEMBERS_LIST_REQUEST'
        });

        const { deleteData } = deleteUsersResponse;
        const { data } = getUsersResponse;
        if (deleteData.error) {
            const { message } = deleteData;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR, error: message });
        } else {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR, error }),
        ]);
    }
}

function* MultiDeleteUsersPermission(action) {
    try {
        const MultiDeleteUsersResponse = yield call(multideleteUser, action);
        const getUsersResponse = yield call(getUsers, {
            payload: {},
            type: 'USER_MANAGEMENT_MEMBERS_LIST_REQUEST'
        });
        const { multiDeleteData } = MultiDeleteUsersResponse;
        const { data } = getUsersResponse;
        if (multiDeleteData.error) {
            const { message } = multiDeleteData;
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_ERROR, error: message });
        } else {
            yield put({ type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_ERROR, error }),
        ]);
    }
}

export default function* watchgetUserManagementSaga() {
    yield all([
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_REQUEST, getUsers),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_REQUEST, addNewUsers),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_REQUEST, UpdateUsersPermission),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_REQUEST, DeleteUsersPermission),
        takeLatest(UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_REQUEST, MultiDeleteUsersPermission),
    ]);
}
