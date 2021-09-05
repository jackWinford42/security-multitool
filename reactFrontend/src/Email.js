import React, { useState } from "react";
import { Alert, Card, CardBody} from 'reactstrap';
import RamtApi from "./Api";
//import axios from "axios";

/** Render the email page and handle a call to the emailrep api
 */
export default function Email() {
  console.debug("EMAIL COMPONENT")
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(email)
    //const res = await axios(`https://emailrep.io/${email}?summary=true`);
    const res = await RamtApi.getEmailRes(email)
    console.log(res);
    // if (res.worked) history.push("/");
    // else setErrors(res.errors);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setEmail(value)
  }

	return (
		<div className="Email">
      <Card>
        <CardBody>
          <p>Enter an email to test its reputation.</p>
          <form className="form-inline" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              className="form-control form-control-md"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
            />
            <button type="submit" className="authButton btn btn-lg btn-primary">
              Investigate
            </button>
          </form>
          {errors.length ? <Alert color="danger">{errors}</Alert>:null}
        </CardBody>
      </Card>
		</div>
	);
}