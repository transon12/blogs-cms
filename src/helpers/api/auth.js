// @flow
import { APICore, setAuthorization } from './apiCore';

const api = new APICore();

// account

function loginGoogle(params) {
    const body = { firebaseToken: params?.firebaseToken };
    setAuthorization(params?.accessToken);
    return api.create('auth/token', body);
}

function login(params) {
    const baseUrl = '/login/';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params) {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params) {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params) {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

function getDetail(params) {
    const baseUrl = 'api/users/';
    return api.get(`${baseUrl}` + params.userId);
}

function updateUser(params) {
    const baseUrl = 'api/users/';
    return api.update(`${baseUrl}` + params.id, params);
}

function getAllProjects() {
    const baseUrl = 'api/project/';
    return api.get(`${baseUrl}`);
}

function updateToken(params) {
    const baseUrl = 'token';
    return api.create(`${baseUrl}`, params);
}



export {
    loginGoogle,
    login,
    logout,
    signup,
    forgotPassword,
    forgotPasswordConfirm,
    getDetail,
    updateUser,
    getAllProjects,
    updateToken,
};
