import Immutable from 'seamless-immutable';
import * as types from "../actions/root/actionTypes";

const initialState = Immutable({
  root: 'showList',
});

export default function Root(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.payload
      });
    default:
      return state;
  }
}
