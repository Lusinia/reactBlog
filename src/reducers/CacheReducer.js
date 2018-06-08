import Immutable from 'seamless-immutable';
import * as types from "../actions/cache/actionTypes";

const initialState = Immutable({
  data: {
    size: 0,
    files: 0
  },
});

export default function CacheReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CACHE_DATA:
      return state.merge({
        data: action.payload
      });
    default:
      return state;
  }
}
