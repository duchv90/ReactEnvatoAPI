import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/purchases';
import API from '../api';

export default function* fetchAuthorSale(action) {
  try {
    const respond = yield call(API.purchases.getSale, action.code);
    yield put(actions.fetchAuthorSaleSuccess(respond));
  } catch (error) {
    yield put(actions.fetchAuthorSaleFail(error));
  }
}
