import React from "react";

/** Render the landing page
 */
export default function Landing() {
	return (
		<div className="Landing">
			<h1>RAMT</h1>
			<h5>Welcome to the home of the Reputation Analyses Multi Tool</h5>
			<p id="authButtons">
				<a className="btn btn-primary font-weight-bold mr-3" href="/login">Log in</a>
				<a className="btn btn-primary font-weight-bold" href="/sign-up">Sign up</a>
			</p>
		</div>
	);
}