import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from 'reactstrap';
import RamtApi from "../common/Api";
import Response from "./Response";
import CircularProgress from '@mui/material/CircularProgress';
import "./Investigate.css"

/** Render the email page and handle a call to the emailrep api
 */
export default function Email() {
  console.debug("EMAIL COMPONENT")
  const userEmail = useSelector(st => st.currUser.email);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false)

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    const res = (await RamtApi.investigate({type: "email", investigate: email, email: userEmail})).data
    setLoading(false);
    setData(res);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setEmail(value)
  }

	return (
		<div className="Email">
      <Card className="formCard">
        <CardBody>
          <p>Enter an email to test its reputation.</p>
          <small>Emails which are 100% safe are only saved to
            your history and are excluded from the site-wide history.</small>
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
      {loading && <CircularProgress color="secondary" />}
      {data.message && <Response data={data}/>}
		</div>
	);
}