import * as types from '../actionTypes/UserManagementActionTypes';

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.USER_MANAGEMENT_MEMBERS_LIST_REQUEST:
            newState = Object.assign({}, state);
            const data = action.data;
            newState.userList = data;

        return newState;

        case types.USER_MANAGEMENT_MEMBERS_LIST_SUCCESS:
            newState = Object.assign({}, state);
            const dataValue = action.data;
            newState.userListResponse = dataValue;

        return newState;

        case types.USER_MANAGEMENT_MEMBERS_LIST_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.USER_MANAGEMENT_ADD_USER_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.USER_MANAGEMENT_ADD_USER_SUCCESS:
            newState = Object.assign({}, state);
            const addUserSuccess = action.data;
            newState.userDataSuccess = addUserSuccess;

        return newState;

        case types.USER_MANAGEMENT_ADD_USER_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.USER_MANAGEMENT_UPDATE_USER_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.USER_MANAGEMENT_UPDATE_USER_SUCCESS:
            newState = Object.assign({}, state);
            const updatePermissionSuccess = action.data;
            newState.updateUserSuccess = updatePermissionSuccess;


        return newState;

        case types.USER_MANAGEMENT_UPDATE_USER_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.USER_MANAGEMENT_DELETE_USER_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

    return newState;

        case types.USER_MANAGEMENT_DELETE_USER_SUCCESS:
             newState = Object.assign({}, state);
             const deleteUserSuccess = action.data;
             newState.userDataSuccess = deleteUserSuccess;

    return newState;

        case types.USER_MANAGEMENT_DELETE_USER_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

    return newState;

    case types.USER_MANAGEMENT_MULTI_DELETE_USER_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

    return newState;

        case types.USER_MANAGEMENT_MULTI_DELETE_USER_SUCCESS:
             newState = Object.assign({}, state);
             const multideleteUserSuccess = action.data;
             newState.multideleteuserDataSuccess = multideleteUserSuccess;

    return newState;

        case types.USER_MANAGEMENT_MULTI_DELETE_USER_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

    return newState;

        case types.USER_MANAGEMENT_ADD_USERS:
        newState = Object.assign({}, state);
        const value = action.userList;
        newState.AddUser = value;

        return newState;

        case types.USER_MANAGEMENT_UPDATE_USERS:
        newState = Object.assign({}, state);
        const datas = action.userList;
        newState.updateUser = datas;

        return newState;

        default:
            return state;
    }
}
