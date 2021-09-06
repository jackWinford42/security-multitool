import React, { useState } from "react";
import { Alert, Card, CardBody} from 'reactstrap';
import RamtApi from "../Api";
import Response from "./Response";
//import axios from "axios";

/** Render the email page and handle a call to the emailrep api
 */
export default function Email() {
  console.debug("EMAIL COMPONENT")
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await RamtApi.getEmailRes(email)
    console.log("CHECKPOINT")
    console.log(res);
    setData(res)
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
        </CardBody>
      </Card>
      <Response data={data}/>
		</div>
	);
}