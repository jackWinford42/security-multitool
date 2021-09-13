import React, {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import Routes from "./Routes";
import RamtApi from "./Api";
import { useDispatch } from 'react-redux';
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        let { username } = jwt.decode(token);

        RamtApi.token = token;
        const userData = await RamtApi.getCurrUser(username);
        RamtApi.user = await userData;

        dispatch({type: "BEGIN_AUTH_SESSION", user: userData})
      } catch (err) {
        console.error("App getUser: issue loading user", err);
      }
    }
    setIsLoading(true);
    if (token) getUser();
    setIsLoading(false);
  }, [token, dispatch]);

  async function signup(formData) {
    try {
      const returnedToken = await RamtApi.signup(formData)
      setToken(returnedToken);
      localStorage.setItem("token", returnedToken);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while signing up", errors);
      return {worked: false, errors};
    }
  }

  async function login(formData) {
    try {
      console.log(formData)
      const returnedToken = await RamtApi.login(formData)
      console.log(returnedToken)
      setToken(returnedToken);
      localStorage.setItem("token", returnedToken);
      return {worked: true};
    } catch (errors) {
      console.error("There was an error while logging in", errors);
      return {worked: false, errors};
    }
  }

  async function logout() {
    setToken(null);
    dispatch({type: "END_AUTH_SESSION"})
    localStorage.removeItem("token");
    console.debug("SUCCESSFULLY LOGGED OUT")
  }

  if (isLoading) return <p>Loading &hellip;</p>;

  return (
    <div className="App">
      <Routes signup={signup} login={login} logout={logout}/>
    </div>
  );
}