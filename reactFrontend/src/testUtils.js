import React from "react";
import { Provider, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)));

const demoUser = {
  email: "jackwinford@gmail.com",
  username: "captainjack",
  password: "qwerty",
  photo_url: "https://bit.ly/3C2VUgQ",
};

// const dispatch = useDispatch();
// await dispatch({type: "BEGIN_AUTH_SESSION", user: demoUser});

const UserProvider =(
    ({children}) =>
    (<Provider store={store}>
      {children}
    </Provider>)
);

export { UserProvider };