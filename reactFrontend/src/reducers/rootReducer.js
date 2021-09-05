const INITIAL_STATE = { currUser: {} };

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEGIN_AUTH_SESSION":
      return { ...state, "currUser": action.user }
    case "END_AUTH_SESSION":
      return {...state, "currUser": {}};
    default:
      return state;
  }
}