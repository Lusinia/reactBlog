import * as types from './actionTypes';


/* Action Creator */
export const fetchData = payload => ({
  type: types.FETCH_DATA,
  payload
});

/* Dispatch the actionCreator */

export const setData = data => dispatch => {
  dispatch(fetchData(data));
};