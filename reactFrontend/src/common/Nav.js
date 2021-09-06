import React from "react";
import {useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

/** Displays a navbar with variable links depending on whether
 * there is an authenticated user or not.
 */
export default function Navigation({logout}) {
  const user = useSelector(st => st.currUser);
  console.log(user)
  const loggedIn = () => {
    return (
      <Nav className="navbar-nav mr-auto" navbar>
        <NavItem>
          <NavLink to="/email">Email</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/url">Url</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/" onClick={logout}>Log out</NavLink>
        </NavItem>
      </Nav>
    )
  }

  const unauthed = () => {
    return (
      <Nav className="navbar-nav mr-auto" navbar>
        <NavItem>
          <NavLink to="/sign-up">sign up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">log in</NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar color="light" light expand="md">
      <NavLink to="/" className="navbar-brand">
        Jobly
      </NavLink>
      {(user.username) ? loggedIn() : unauthed()}
    </Navbar>
  );
}