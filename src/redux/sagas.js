// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import dashboardSaga from './dashboard/saga';
import newpostSaga from './userInformation/saga';
import postPasswordSaga from './userInformation/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), dashboardSaga(),postPasswordSaga(),newpostSaga()]);
}

