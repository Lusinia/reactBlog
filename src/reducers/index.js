import { combineReducers } from 'redux';
import RootReducer from "./RootReducer";
import FetchDataReducer from './FetchDataReducer';

export default combineReducers({
  root: RootReducer,
  fetchedData: FetchDataReducer,
});
