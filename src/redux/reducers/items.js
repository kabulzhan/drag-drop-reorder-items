import { ITEMS_RECEIVED } from "../actions/types";

const INITIAL_STATE = {
  items: [],
};

export default function news(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
