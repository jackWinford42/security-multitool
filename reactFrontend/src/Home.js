import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { v4 as uuidv4 } from "uuid";
import RamtApi from "./common/Api";
import { useDispatch } from 'react-redux';
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
import "./Home.css";

export default React.memo(function Home() {
  const user = useSelector(st => st.currUser);
  const prevLoc = useSelector(st => st.prevLocation)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [displayHistory, setDisplayHistory] = useState([]);
  const [view, setView] = useState('list');

  useEffect(() => {
    async function getHistory() {
      try {
        console.log("INSIDE HOME HOOK")
        const siteHistory = await RamtApi.getSiteHistory();
        console.log(siteHistory)
        setDisplayHistory(siteHistory.history.rows);
      } catch (err) {
        console.error("SiteHistory get: issue loading history", err);
      }
    }
    getHistory();
  }, [])

  console.log(prevLoc)
  if (prevLoc === "/login" || prevLoc === "/sign") {
    setOpen(true);
    dispatch({type: "LOCATION_CHANGE", location: "/home"})
    console.log("got here")
  }

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleClose = () => {
    console.log("IN CLOSE")
    setOpen(false)
  };

  console.log(displayHistory)
  const HistoryItems = displayHistory.map(row => {
    return (
      <li key={uuidv4()}>
        <h5>{row.item}</h5>
        <p>type: {row.type}</p>
        <p>safety score out of 100: {row.score}</p>
        <p>time analysed: {row.time_created}</p>
      </li>
    );
  })
  
  console.log("PAST 54")
  return (
    <div className="Home">
      <ToggleButtonGroup
        id="rangeBar"
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="history" aria-label="history">
          <HistoryOutlinedIcon/>
        </ToggleButton>
        <ToggleButton value="hot" aria-label="hot">
          <LocalFireDepartmentIcon/>
        </ToggleButton>
        <ToggleButton value="allTime" aria-label="allTime">
          <HourglassBottomOutlinedIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
      <ul>
        {HistoryItems}
      </ul>
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