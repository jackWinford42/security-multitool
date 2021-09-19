import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from 'reactstrap';
import RamtApi from "../common/Api";
import Response from "./Response";

/** Render the email page and handle a call to the emailrep api
 */
export default function Email() {
  console.debug("EMAIL COMPONENT")
  const userEmail = useSelector(st => st.currUser.email);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = (await RamtApi.investigate({type: "email", investigate: email, email: userEmail})).data
    console.log(res)
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
      {data.message && <Response data={data}/>}
		</div>
	);
}