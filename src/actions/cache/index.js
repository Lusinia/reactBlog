import * as types from './actionTypes';


/* Action Creator */
export const cacheData = payload => ({
  type: types.CACHE_DATA,
  payload
});


/* Dispatch the actionCreator */

export const setCacheData = (data) => dispatch => {
  dispatch(cacheData(data));
};