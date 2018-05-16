import { takeLatest } from 'redux-saga/effects';
import { USER_LOGIN, FETCH_CURRENT_USER_REQUEST } from './constants/auth';
import { FETCH_STATEMENT, FETCH_AUTHOR_ITEMS } from './constants/statement';
import { FETCH_AUTHOR_SALE } from './constants/purchases';
import { userLoginSaga, fetchUserSaga } from './sagas/authSaga';
import fetchUserStatement from './sagas/statementSaga';
import fetchAuthorSale from './sagas/purchasesSaga';

export default function* rootSaga() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga);
  yield takeLatest(FETCH_STATEMENT, fetchUserStatement);
  yield takeLatest(FETCH_AUTHOR_SALE, fetchAuthorSale);
};
