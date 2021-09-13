import React, { useState } from "react";
import { useSelector } from "react-redux";
import RamtApi from "../Api";
import { Card, CardBody} from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function Profile() {
  const {form, setForm} = useState({
    username: "",
    email: ""
  })
  const user = useSelector(st => st.currUser);
  console.log(user)
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await RamtApi.editCurrUser(form)
    console.log("CHECKPOINT")
    console.log(res);

    history.push("/profile");
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setForm(value)
  }

  return (
    <div className="Profile">
      <div id="title">
        <h1>Your Profile</h1>
      </div>
      <div id="profile_content">
        <Card>
          <CardBody>
            <p>Edit details for your account.</p>
            <form className="form-inline" onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                className="form-control form-control-md"
                name="username"
                placeholder="username"
                value={form.username}
                onChange={handleChange}
              />
              <label>Profile Picture Url:</label>
              <input
                className="form-control form-control-md"
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
              />
              <button type="submit" className="authButton btn btn-lg btn-primary">
                Edit
              </button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}