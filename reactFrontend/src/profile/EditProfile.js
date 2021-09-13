import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RamtApi from "../common/Api";
import { Card, CardBody} from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "",
    profile_pic: ""
  });
  const dispatch = useDispatch();
  const user = useSelector(st => st.currUser);
  console.log(user)
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await RamtApi.editCurrUser(formData)
    console.log("CHECKPOINT")
    console.log(res);
    res.user.email = user.email;
    dispatch({type: "BEGIN_AUTH_SESSION", user: res.user})
    history.push("/profile");
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="EditProfile">
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
                value={formData.username}
                onChange={handleChange}
              />
              <label>Profile Picture Url:</label>
              <input
                className="form-control form-control-md"
                name="profile_pic"
                placeholder="profile_pic"
                value={formData.profile_pic}
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