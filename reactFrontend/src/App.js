import React, {useEffect} from "react";
import jwt from "jsonwebtoken";
import Routes from "./common/Routes";
import RamtApi from "./common/Api";
import { useDispatch } from 'react-redux';
import './App.css';
import useLocalStorage from "./hooks/useLocalStorage";

const TOKEN_STORAGE_ID = "start token"

export default function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        console.log("INSIDE APP HOOK")

        let { email } = jwt.decode(token);

        if (!RamtApi.token) RamtApi.token = token;
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
      setToken(returnedToken);
      RamtApi.token = returnedToken;
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while logging in", errors);
      return {worked: false, errors};
    }
  }

  async function edit(formData) {
    try {
      const returnedToken = (await RamtApi.editCurrUser(formData)).token
      setToken(returnedToken);
      RamtApi.token = returnedToken;
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while editing your profile", errors);
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
      <Routes signup={signup} login={login} logout={logout} edit={edit}/>
    </div>
  );
}
