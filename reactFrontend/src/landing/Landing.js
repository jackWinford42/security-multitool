import React from "react";
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import "./Landing.css";

/** Render the landing page
 */
export default function Landing() {
	return (
		<div className="Landing">
			<h1>RAMT</h1>
			<h5>home of the Reputation Analyses Multi Tool</h5>
			<p id="authButtons">
        <Link component={RouterLink} to="/sign-up" className="authButtonsLeft">
          <Button variant="contained">sign up</Button>
        </Link>
        <Link component={RouterLink} to="/login" className="authButtonsRight">
          <Button variant="contained">log in</Button>
        </Link>
			</p>
		</div>
	);
}