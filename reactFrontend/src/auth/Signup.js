import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, CardBody } from 'reactstrap';
import "./formStyles.css"

/** Sign up form for getting the username, password, first name,
 * last name, and email of a new user. On submit a callback function
 * from app is called to register the user with the values from the
 * form.
 */
export default function Signup({ signup }) {
  const history = useHistory();
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
    if (res.worked) history.push("/");
    else setErrors(res.errors);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
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
                name="profile_pic"
                placeholder="url"
                value={formData.profile_pic}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-lg btn-primary">
                sign up
              </button>
            </form>
            {errors.length > 0 && 
            errors.map(error => <Alert color="danger" key={error}>{error}</Alert>)}
          </CardBody>
        </Card>
      </div>
  );
}