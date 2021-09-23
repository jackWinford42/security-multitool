import React, { useState } from "react";
import { Card, CardBody} from 'reactstrap';
import RamtApi from "../Api";
import PhoneResponse from "./PhoneResponse";

/** Render the phone page and handle a call to the api at the investigate route
 */
export default function Phone() {
  console.debug("PHONE COMPONENT")
  const [phone, setPhone] = useState("");
  const [data, setData] = useState({});

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = (await RamtApi.investigate({type: "phone", investigate: encodeURIComponent(phone)})).data
    console.log("CHECKPOINT")
    console.log(res);
    setData(res)
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setPhone(value)
  }

	return (
		<div className="Phone">
      <Card>
        <CardBody>
          <p>Enter an phone number to test its reputation.</p>
          <form className="form-inline" onSubmit={handleSubmit}>
            <label>Phone Number:</label>
            <input
              className="form-control form-control-md"
              name="phone"
              placeholder="phone"
              value={phone}
              onChange={handleChange}
            />
            <button type="submit" className="authButton btn btn-lg btn-primary">
              Investigate
            </button>
          </form>
        </CardBody>
      </Card>
      {data.message && <PhoneResponse data={data}/>}
		</div>
	);
}