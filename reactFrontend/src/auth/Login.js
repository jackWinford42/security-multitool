import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Alert, Card, CardBody} from 'reactstrap';
import Button from "@material-ui/core/Button";
import "./formStyles.css"

/** Sign up form for getting the username, password a user.
 *  On submit a callback function from app is called to authenticate 
 * the user with the values from the form.
 */
function LoginForm({ login }) {
  const history = useHistory();
  const dispatch = useDispatch();
  console.debug("Log in form");

  const [formData, setFormData] = useState({
    username:"",
    password:""
  });
  const [errors, setErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    //send the form data to app's login function
    const res = await login(formData)
    if (res.worked) {
      await dispatch({type: "LOCATION_CHANGE", location: "/login"})
      history.push("/home")
      
    } else setErrors(res.errors);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm col-md-6 col-lg-4">
      <Card>
        <CardBody>
          <form className="form-inline" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              className="form-control form-control-md"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              className="form-control form-control-md"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" className="authButton" onClick={handleSubmit}>
              log in
            </Button>
          </form>
          {errors.length ? <Alert color="danger">{errors}</Alert>:null}
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginForm;