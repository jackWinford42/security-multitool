import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import "./App.css";
import Landing from "./Landing";
import Nav from "./common/Nav";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Email from "./Email";

/** Router servers as a router and parent function for nav and page 
 * content on each route.
 */
export default function Routes({signup, login, logout}) {
  const user = useSelector(st => st.currUser);
  const dispatch = useDispatch();
  console.log(user)

  // useEffect(function() {
  //   async function fetchTitle() {
  //     await dispatch({type: 'FETCH_USER'});
  //   }
  //   fetchTitle();
  // }, [dispatch]);

  const privateRoutes = (
    <Switch>
      <Route exact path="/">
        <Landing/>
      </Route>
      <Route path="/email">
        <Email/>
      </Route>
      <Route path="/url">
        <Email/>
      </Route>
      <Route path="/home">
        <Email/>
      </Route>
      <Route path="/profile">
        <Email/>
      </Route>
      <Route>
        <p>Hmmm. I can't seem to find what you want.</p>
      </Route>
    </Switch>
  )

  const unAuthedRoutes = (
    <Switch>
      <Route exact path="/">
        <Landing/>
      </Route>
      <Route path="/email">
        <Email/>
      </Route>
      <Route path="/login">
        <Login login={login}/>
      </Route>
      <Route path="/sign-up">
        <Signup signup={signup}/>
      </Route>
      <Route>
        <p>Hmmm. I can't seem to find what you want. You may need to be authorized before visiting this page.</p>
      </Route>
    </Switch>
  )
  console.log(!!user.username)
  console.log((user.username) ? privateRoutes : unAuthedRoutes)
  return (
    <BrowserRouter>
      <Nav logout={logout}/>
      <main>
        {(user.username) ? privateRoutes : unAuthedRoutes}
      </main>
    </BrowserRouter>
  );
}