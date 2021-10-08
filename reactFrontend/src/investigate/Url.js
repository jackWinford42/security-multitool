import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Card, CardBody} from 'reactstrap';
import RamtApi from "../common/Api";
import UrlResponse from "./UrlResponse";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Investigate.css';

/** Render the Url page and handle a call to the api at the investigate route
 */
export default function Url() {
  console.debug("URL COMPONENT")
  const userEmail = useSelector(st => st.currUser.email);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true)
    if (!url.replace(/\s/g,"").length) setError("Blank space is not a valid url/domain.")
    else {
      setError("");
      const res = (await RamtApi.investigate({type: "url", investigate: encodeURIComponent(url), email: userEmail})).data;
      setData(res);
    }
    setLoading(false)
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setUrl(value)
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

	return (
		<div className="Url">
      <Card className="formCard">
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
      {data.message && <UrlResponse data={data} open={handleOpen}/>}
      {!!error && <Alert color="danger">{error}</Alert>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Investigate Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            The safety score is a percentage based on the url/domain reputation and recent known behavior. A safety score below 25 is highly suspicious but not necessarily fraudulent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
		</div>
	);
}
