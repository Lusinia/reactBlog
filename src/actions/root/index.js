import * as types from './actionTypes';


/* Action Creator */

export const changedTab = (payload) => ({
  type: types.ROOT_CHANGED,
  payload
});

/* Dispatch the actionCreator */

export const selectTab = (data) => dispatch => {
    dispatch(changedTab(data));
};