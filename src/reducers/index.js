import { combineReducers } from 'redux';
import RootReducer from "./RootReducer";
import FetchDataReducer from './FetchDataReducer';
import CacheReducer from './CacheReducer';

export default combineReducers({
  root: RootReducer,
  fetchedData: FetchDataReducer,
  cacheData: CacheReducer,
});
