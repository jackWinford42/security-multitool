import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from 'reactstrap';
import RamtApi from "../common/Api";
import Response from "./Response";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Investigate.css"

/** Render the email page and handle a call to the emailrep api
 */
export default function Email() {
  console.debug("EMAIL COMPONENT")
  const userEmail = useSelector(st => st.currUser.email);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    if (!email.replace(/\s/g,"").length) setError("Blank space is not a valid email address.")
    else {
      setError("");
      const res = (await RamtApi.investigate({type: "email", investigate: email, email: userEmail})).data
      setData(res);
    }
    setLoading(false);
  }

  // Update form data to reflect change in form fields
  function handleChange(evt) {
    const { value } = evt.target;
    setEmail(value)
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

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
      {data.message && <Response data={data} open={handleOpen}/>}
      {!!error && error}
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
            The safety score is a percentage based on the email reputation and recent known behavior. A safety score below 25 is highly suspicious but not necessarily fraudulent.
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