import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Landing from "./Landing";
import Nav from "./common/Nav";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Email from "./investigate/Email";
import Url from "./investigate/Url";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import Home from "./Home";

/** Router servers as a router and parent function for nav and page 
 * content on each route.
 */
export default function Routes({signup, login, logout}) {
  const user = useSelector(st => st.currUser);
  console.log(user)

  const privateRoutes = (
    <Switch>
      <Route exact path="/">
        <Landing/>
      </Route>
      <Route path="/email">
        <Email/>
      </Route>
      <Route path="/url">
        <Url/>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/profile">
        <Profile logout={logout}/>
      </Route>
      <Route path="/edit-profile">
        <EditProfile/>
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