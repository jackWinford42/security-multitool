import React from "react";
import {useSelector} from "react-redux";

/** Render the landing page
 */
export default function Landing() {
	const user = useSelector(st => st.currUser);
	console.log(user)
	const greeting = (<h4>Welcome back {user.username}</h4>);
	return (
		<div className="Landing">
			<h1>RAMT</h1>
			<h5>home of the Reputation Analyses Multi Tool</h5>
			{(user.username) ? 
			greeting :
			<p id="authButtons">
				<a className="btn btn-primary font-weight-bold mr-3" href="/login">Log in</a>
				<a className="btn btn-primary font-weight-bold" href="/sign-up">Sign up</a>
			</p>}
		</div>
	);
}