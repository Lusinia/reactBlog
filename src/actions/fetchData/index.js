import * as types from './actionTypes';


/* Action Creator */

export const fetchDataSuccess = (root) => {
  return {
    type: types.ROOT_CHANGED,
    root: root
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataSuccess('aaaaa'));
  };
};
/* Dispatch the actionCreator */

export const setData = data => dispatch => {
  dispatch(fetchData(data));
};