import Immutable from 'seamless-immutable';
import * as types from "../actions/fetchData/actionTypes";

const initialState = Immutable({
  data: null,
});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_DATA:
      return state.merge({
        data: action.payload
      });
    default:
      return state;
  }
}
