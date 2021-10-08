import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Card, CardBody} from 'reactstrap';
import { useHistory } from "react-router-dom";

export default function EditProfile({edit}) {
  const user = useSelector(st => st.currUser);
  const [formData, setFormData] = useState({
    username: user.username,
    profile_pic: user.profile_pic
  });
  const [error, setError] = useState("");

  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!formData.username) setError("username cannot be empty")
    else if (formData.username.length > 15) setError("username cannot be more than 15 letters long")
    else {
      edit(formData)
      history.push("/profile");
    }
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
            {!!error && <Alert color="danger">{error}</Alert>}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}