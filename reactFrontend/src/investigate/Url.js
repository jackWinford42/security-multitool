import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody} from 'reactstrap';
import RamtApi from "../common/Api";
import UrlResponse from "./UrlResponse";
import CircularProgress from '@mui/material/CircularProgress';

/** Render the Url page and handle a call to the api at the investigate route
 */
export default function Url() {
  console.debug("URL COMPONENT")
  const userEmail = useSelector(st => st.currUser.email);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false)

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true)
    const res = (await RamtApi.investigate({type: "url", investigate: encodeURIComponent(url), email: userEmail})).data
    console.log(res)
    setLoading(false)
    setData(res)
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setUrl(value)
  }

	return (
		<div className="Url">
      <Card>
        <CardBody>
          <p>Enter an url to test its reputation.</p>
          <form className="form-inline" onSubmit={handleSubmit}>
            <label>Url:</label>
            <input
              className="form-control form-control-md"
              name="url"
              placeholder="url"
              value={url}
              onChange={handleChange}
            />
            <button type="submit" className="authButton btn btn-lg btn-primary">
              Investigate
            </button>
          </form>
        </CardBody>
      </Card>
      {loading && <CircularProgress color="secondary" />}
      {data.status_code === 200 && <UrlResponse data={data}/>}
		</div>
	);
}