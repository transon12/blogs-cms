// @flow
import { APICore } from './apiCore';
// import axios from 'axios';

const api = new APICore();

function getMeListApi(params) {
    return api.get('api/me/list', params);
}

function updateMeApi(params) {
    return api.update(`api/me/${params?.meId}`, params?.body);
}

function submitMeApi(params) {
    return api.update(`api/me/submit/${params}`);
}

function approveMeApi(params) {
    return api.update(`api/me/approve/${params}`);
}

function feedbackMeApi(params) {
    return api.update(`api/me/feedback/${params}`);
}

function approveMultipleMeApi(params) {
    return api.update(`api/me/approve/list`, params);
}

function feedbackMultipleMeApi(params) {
    return api.update(`api/me/feedback/list`, params);
}
function changePasswordApi (params){
    console.log(params);
    return api.create(`api/student/change-password`, params);
}

export {
    getMeListApi,
    updateMeApi,
    submitMeApi,
    approveMeApi,
    feedbackMeApi,
    approveMultipleMeApi,
    feedbackMultipleMeApi,
    changePasswordApi
};
