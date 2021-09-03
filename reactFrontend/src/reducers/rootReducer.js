// import posts from './postReducer';
// import titles from './cardReducer';
// import { combineReducers } from "redux";

// export default combineReducers({
//   posts,
//   titles,
// });

const INITIAL_STATE = { user: {} };

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BEGIN_AUTH_SESSION":
      return { ...state, "currUser": action.user }
    case "END_AUTH_SESSION":
      let user = { ...state };
      delete user.currUser;
      return user;
    default:
      return state;
  }
}