import Immutable from 'seamless-immutable';
import { USER_INFO } from '../actions/facebookLogin/actionTypes';

const initialState = Immutable({
  userInfo: null,
});

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_INFO:
      return state.merge({
        userInfo: action.payload
      });
    default:
      return state;
  }
}
