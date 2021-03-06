import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Alert, Card, CardBody } from 'reactstrap';
import Button from "@material-ui/core/Button";
import "./formStyles.css"

/** Sign up form for getting the username, password, first name,
 * last name, and email of a new user. On submit a callback function
 * from app is called to register the user with the values from the
 * form.
 */
export default function Signup({ signup }) {
  const history = useHistory();
  const dispatch = useDispatch();
  console.debug("Sign up form");

  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:"",
    profile_pic:""
  });
  const [errors, setErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    //send the form data to app's signup function
    const res = await signup(formData)

    if (res.worked) {
      //store the path in redux store so home can display a pop-up
      await dispatch({type: "LOCATION_CHANGE", location: "/sign-up"})
      history.push("/home");
    } else setErrors(res.errors);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm col-md-6 col-lg-4">
        <Card className="authFormCard">
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
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>Email:</label>
              <input
                className="form-control form-control-md"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Profile Picture Url:</label>
              <input
                className="form-control form-control-md"
                id="bottomInput"
                name="profile_pic"
                placeholder="url"
                value={formData.profile_pic}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" className="authButton" onClick={handleSubmit}>
                sign up
              </Button>
            </form>
            {errors.length > 0 && 
            errors.map(error => <Alert color="danger" key={error}>{error}</Alert>)}
          </CardBody>
        </Card>
      </div>
  );
}