import * as types from './actionTypes';
import Axios from 'axios';
import { error } from '../root';
import { FB_ACCESS, FB_PROFILE } from '../../constants';
import { AsyncStorage } from 'react-native';


/* Action Creator */
export const userInfo = payload => ({
  type: types.USER_INFO,
  payload
});

export const LoginRequest = (token) => async (dispatch) => {
  try {
    const response = await Axios.post(FB_ACCESS, { token });
    const responseToken = response.data.token;

    if (responseToken) {
      await AsyncStorage.setItem('token', responseToken);

      try {
        const res = await Axios.get(FB_PROFILE, { headers: { authorization: responseToken }});
        if (res) {
          dispatch(userInfo(res.data));
        }
      } catch (err) {
        dispatch(error('Get user info error', err.message));
      }
    }
  } catch (err) {
    dispatch(error('Send token error', err.message));
  }
};

/* Dispatch the actionCreator */

export const sendLoginRequest = (token) => async (dispatch) => {
  await dispatch(LoginRequest(token));
};