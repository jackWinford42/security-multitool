import React from "react";
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.text.secondary,
  },
}));

/** Displays a navbar with variable links depending on whether
 * there is an authenticated user or not.
 */
export default function Navigation({logout}) {
  const classes = useStyles();
  const user = useSelector(st => st.currUser);

  const loggedIn = () => {
    return (
      <>
        <Link component={RouterLink} to="/email"><Button>Email</Button></Link>
        <Link component={RouterLink} to="/url"><Button>Url</Button></Link>
        <Link component={RouterLink} to="/profile"><Button>Profile</Button></Link>
        <Link component={RouterLink} to="/" onClick={logout}><Button>Log out</Button></Link>
      </>
    )
  }

  const unauthed = () => {
    return (
      <>
        <Link component={RouterLink} to="/sign-up"><Button>sign up</Button></Link>
        <Link component={RouterLink} to="/login"><Button>log in</Button></Link>
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {(user.username) ? 
          <Link component={RouterLink} to="/home">
            <Button variant="outlined">
              RAMT
            </Button>
          </Link> :
          <Link component={RouterLink} to="/">
            <Button variant="outlined">
              RAMT
            </Button>
          </Link>}
          <div className="position-absolute end-0">
            {(user.username) ? loggedIn() : unauthed()}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}