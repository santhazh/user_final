import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';

export const userManagementMembersListRequest = (values = {}) => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_REQUEST,
    payload: values,
});

export const userManagementMembersListSuccess = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS,
    payload: value,
});

export const userManagementMembersListError = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MEMBERS_LIST_ERROR,
    payload: value,
});


export const userManagementAddUserRequest = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_REQUEST,
    payload: value,
});

export const userManagementAddUserSuccess = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_SUCCESS,
    payload: value,
});

export const userManagementAddUserError = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_ADD_USER_ERROR,
    payload: value,
});

export const userManagementUpdateUserRequest = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_REQUEST,
    payload: value,
});

export const userManagementUpdateUserSuccess = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_SUCCESS,
    payload: value,
});

export const userManagementUpdateUserError = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USER_ERROR,
    payload: value,
});

export const userManagementDeleteUserRequest = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_REQUEST,
    payload: id,
});

export const userManagementDeleteUserSuccess = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_SUCCESS,
    payload: id,
});

export const userManagementDeleteUserError = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_DELETE_USER_ERROR,
    payload: id,
});

export const userManagementMultiDeleteUserRequest = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_REQUEST,
    payload: id,
});

export const userManagementMultiDeleteUserSuccess = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_SUCCESS,
    payload: id,
});

export const userManagementMultiDeleteUserError = id => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_MULTI_DELETE_USER_ERROR,
    payload: id,
});

export const userManagementUpdateMembers = value => ({
    type: UserManagementActionTypes.USER_MANAGEMENT_UPDATE_USERS,
    payload: value,
});

export default {
    userManagementMembersListRequest,
    userManagementMembersListSuccess,
    userManagementMembersListError,
    userManagementAddUserRequest,
    userManagementAddUserSuccess,
    userManagementAddUserError,
    userManagementUpdateUserRequest,
    userManagementUpdateUserSuccess,
    userManagementUpdateUserError,
    userManagementDeleteUserRequest,
    userManagementDeleteUserSuccess,
    userManagementDeleteUserError,
    userManagementMultiDeleteUserRequest,
    userManagementMultiDeleteUserSuccess,
    userManagementMultiDeleteUserError,
    userManagementUpdateMembers
};
