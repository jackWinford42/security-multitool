import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import "./Home.css";
import AllTime from "./AllTime";
import Hot from "./Hot";
import History from "./History";

export default React.memo(function Home() {
  const user = useSelector(st => st.currUser);
  const prevLoc = useSelector(st => st.prevLocation)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('history');

  //only display the welcome dialog box if the user just signed in
  if (prevLoc === "/login" || prevLoc === "/sign-up") {
    setOpen(true);
    dispatch({type: "LOCATION_CHANGE", location: "/home"})
  }

  const handleChange = (event, nextView) => {
    setView(nextView);
    console.log(nextView)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const choseRange = () => {
    if (view === "history" ) {
      return (<History/>)
    } else if (view === "hot") {
      return (<Hot/>)
    } else {
      return (<AllTime/>)
    }
  }

  return (
    <div className="Home">
      <ToggleButtonGroup
        id="rangeBar"
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <Tooltip title="Recent History" placement="right">
          <ToggleButton value="history" aria-label="history">
            <HistoryOutlinedIcon/>
          </ToggleButton>        
        </Tooltip>
        <Tooltip title="Hot" placement="right">
          <ToggleButton value="hot" aria-label="hot">
            <LocalFireDepartmentIcon/>
          </ToggleButton>
        </Tooltip>
        <Tooltip title="All Time" placement="right">
          <ToggleButton value="allTime" aria-label="allTime">
            <HourglassBottomOutlinedIcon/>
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      {choseRange()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Welcome back {user.username}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            You are now authorized to use the Reputation Analyses Multi Tool.<br></br>
            Please, enjoy your stay.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Let's go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
