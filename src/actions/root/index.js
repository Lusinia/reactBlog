import * as types from './actionTypes';


/* Action Creator */

export const changeAppRoot = (root) => {
  return {
    type: types.ROOT_CHANGED,
    root: root
  };
};

/* Dispatch the actionCreator */

export const appInitialized = () => {
  return async function (dispatch, getState) {
    dispatch(changeAppRoot('ShowList'));
  };
};