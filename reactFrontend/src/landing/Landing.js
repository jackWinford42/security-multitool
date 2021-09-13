import React from "react";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import "./Landing.css";

/** Render the landing page
 */
export default function Landing() {
	const user = useSelector(st => st.currUser);
	const greeting = (<h4>Welcome back {user.username}</h4>);
	return (
		<div className="Landing">
			<h1>RAMT</h1>
			<h5>home of the Reputation Analyses Multi Tool</h5>
			{(user.username) ? 
			greeting :
			<p id="authButtons">
        <Link component={RouterLink} to="/sign-up" className="authButtons">
          <Button variant="contained">sign up</Button>
        </Link>
        <Link component={RouterLink} to="/login" className="authButtons">
          <Button variant="contained">log in</Button>
        </Link>
			</p>}
		</div>
	);
}