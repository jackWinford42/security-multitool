const INITIAL_STATE = { currUser: {}, prevLocation: "" };

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEGIN_AUTH_SESSION":
      return {...state, currUser: action.user }
    case "END_AUTH_SESSION":
      return {...state, currUser: {}};
    case "FETCH_USER":
      return state.currUser;
    case "LOCATION_CHANGE":
      console.log(action)
      console.log(action.location)
      console.log({...state, prevLocation: action.location})
      return {...state, prevLocation: action.location}
    default:
      return state;
  }
}