import { combineReducers } from 'redux';
import RootReducer from "./RootReducer";
import FetchDataReducer from './FetchDataReducer';
import CacheReducer from './CacheReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  root: RootReducer,
  user: UserReducer,
  fetchedData: FetchDataReducer,
  cacheData: CacheReducer,
});
