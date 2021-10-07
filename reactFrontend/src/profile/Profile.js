import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RamtApi from "../common/Api";
import UserHistory from "./UserHistory";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Profile.css"

export default function Profile({logout}) {
  const user = useSelector(st => st.currUser);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [displayHistory, setDisplayHistory] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getHistory() {
      try {
        const userHistory = await RamtApi.getUserHistory(user.email);
        setDisplayHistory(userHistory)
        setEmpty(false);
      } catch (err) {
        console.error("UserHistory get: issue loading history", err);
      }
    }
    setIsLoading(true);
    if (empty) getHistory()
    setIsLoading(false);
  }, [empty, user])

  const goToEdit = () => {
    let path = `/edit-profile`; 
    history.push(path);
  }

  const deleteUser = () => {
    RamtApi.delCurrUser(user.email)
    history.push("/");
    logout();
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const dumpHistory = () => {
    RamtApi.dumpUserHistory(user.email);
    setEmpty(true);
  }

  if (isLoading) return <p>Loading &hellip;</p>;
  return (
    <div className="Profile">
      <div id="title">
        <h1>Profile Page</h1>
      </div>
      <div id="profile_content">
        <div className="row">
          <div className="col-4">
            <img id="profile_page_pic" src={ user.profile_pic } width="250" height="250" alt={ user.username }/>
          </div>
          <div className="col-2"></div>
          <div className="col-5" id="right_profile_div">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><span>Display name: { user.username }</span></li>
              <li className="list-group-item"><span>Email: { user.email }</span></li>
              <li className="list-group-item">
                <button onClick={goToEdit} className="btn btn-lrg btn-warning">Edit</button>
              </li>
              <li className="list-group-item">
                <button onClick={handleOpen} className="btn btn-lrg btn-danger">Delete Account</button>
              </li>
              <li className="list-group-item">
                <button onClick={dumpHistory} className="btn btn-lrg btn-danger">Clear Your History</button>
              </li>
            </ul>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      { displayHistory.history && <UserHistory HistoryItems={displayHistory.history.rows}/>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Are you sure you would like to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Deleting your account is permanent and will remove your history.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            no
          </Button>
          <Button onClick={deleteUser} autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}