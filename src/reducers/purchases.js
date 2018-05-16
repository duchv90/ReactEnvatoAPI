import { FETCH_AUTHOR_SALE, FETCH_AUTHOR_SALE_SUCCESS, FETCH_AUTHOR_SALE_FAIL } from '../constants/purchases';

const initStatePurchases = {
  code: ''
};

export default function purchases(state = initStatePurchases, action) {
  switch (action.type) {
    case FETCH_AUTHOR_SALE:
      return { ...state, code: action.code }
    case FETCH_AUTHOR_SALE_SUCCESS:
      return { ...state, sale: action.data }
    case FETCH_AUTHOR_SALE_FAIL:
      return { ...state, ...action.errors }
    default:
      return state;
  }
}
