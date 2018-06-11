import * as types from './actionTypes';
import Axios from 'axios';
import { BASE_URL } from '../../constants';
import { error } from '../root';


/* Action Creator */
export const fetchData = payload => ({
  type: types.FETCH_DATA,
  payload
});

export const fetchDataRequest = () => (dispatch) => {
  return Axios.get(BASE_URL)
    .then(res => {
      dispatch(fetchData(res.data));
    }, err => {
      dispatch(error('FetchDataRequest', err.message));
    });
};

/* Dispatch the actionCreator */

export const setData = () => dispatch => {
  dispatch(fetchDataRequest());
};