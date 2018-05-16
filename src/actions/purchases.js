import * as Constants from '../constants/purchases';

export const fetchAuthorSales = code => ({
  type: Constants.FETCH_AUTHOR_SALE,
  code
});

export const fetchAuthorSaleSuccess = data => ({
  type: Constants.FETCH_AUTHOR_SALE_SUCCESS,
  data
});

export const fetchAuthorSaleFail = errors => ({
  type: Constants.FETCH_AUTHOR_SALE_FAIL,
  errors
});
