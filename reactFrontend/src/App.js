import React, {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import Routes from "./common/Routes";
import RamtApi from "./common/Api";
import { useDispatch } from 'react-redux';
import './App.css';

export default function App() {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        console.log("INSIDE APP HOOK")
        let { email } = jwt.decode(token);

        const userData = await RamtApi.getCurrUser(email);
        RamtApi.user = userData;

        await dispatch({type: "BEGIN_AUTH_SESSION", user: userData});
      } catch (err) {
        console.error("App getUser: issue loading user", err);
      }
    }
    if (token) getUser();
  }, [token, dispatch]);

  async function signup(formData) {
    try {
      const returnedToken = await RamtApi.signup(formData)
      setToken(returnedToken);
      RamtApi.token = returnedToken;
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while signing up", errors);
      return {worked: false, errors};
    }
  }

  async function login(formData) {
    try {
      const returnedToken = await RamtApi.login(formData)
      console.log(returnedToken)
      setToken(returnedToken);
      RamtApi.token = returnedToken;
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while logging in", errors);
      return {worked: false, errors};
    }
  }

  async function logout() {
    setToken(null);
    dispatch({type: "END_AUTH_SESSION"})
    console.debug("SUCCESSFULLY LOGGED OUT")
  }

  return (
    <div className="App">
      <Routes signup={signup} login={login} logout={logout}/>
    </div>
  );
}