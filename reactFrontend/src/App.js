import React, {useState} from "react"
import Routes from "./Routes";
import RamtApi from "./Api";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');

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
      const returnedToken = await RamtApi.login(formData)
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
    localStorage.removeItem("token");
    localStorage.removeItem("appliedIds");
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <Routes signup={signup} login={login} logout={logout}/>
    </div>
  );
}

export default App;
