import Immutable from 'seamless-immutable';
import * as types from "../actions/root/actionTypes";

const initialState = Immutable({
  selectedTab: 0,
});

export default function Root(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        selectedTab: action.payload
      });
    default:
      return state;
  }
}
