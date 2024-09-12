import { MeTypes } from "./constants";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { responseSuccess, responseError } from './actions';
import {changePasswordApi} from "../../helpers/api/meApi"

function* changePassword ({ payload: { params } }){
  try {
    const response = yield call(changePasswordApi, params);
    if (response.status === 200) {
      const data = response.data ? response.data : null;
      yield put(responseSuccess(MeTypes.CHANGE_PASSWORD, data));
    }
  } catch (error) {
    yield put(responseError(MeTypes.CHANGE_PASSWORD, error));
  }

}
function* postPasswordSaga() {
  yield all([
     takeLatest(MeTypes.CHANGE_PASSWORD, changePassword),])
}
export default postPasswordSaga;

