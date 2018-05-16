import { combineReducers } from 'redux';
import user from './reducers/user';
import statement from './reducers/statement';
import purchases from './reducers/purchases';

export default combineReducers({
  user,
  statement,
  purchases
});
