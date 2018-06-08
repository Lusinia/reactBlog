import * as types from './actionTypes';
import Axios from 'axios';
import { BASE_URL } from '../../constants';


/* Action Creator */
export const fetchData = payload => ({
  type: types.FETCH_DATA,
  payload
});

export const fetchDataRequest = () => (dispatch) => {
  return Axios.get(`${BASE_URL}/Data.json`)
    .then(res => {
      dispatch(fetchData(res.data));
    }, err => {

    });
};

/* Dispatch the actionCreator */

export const setData = () => dispatch => {
  dispatch(fetchDataRequest());
};