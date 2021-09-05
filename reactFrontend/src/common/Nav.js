import React from "react";
import {useSelector} from "react-redux";
import { Navbar, Nav, NavItem, NavLink, } from "reactstrap";

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
          <NavLink href="/email">Email</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/url">Url</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" onClick={logout}>Log out</NavLink>
        </NavItem>
      </Nav>
    )
  }

  const unauthed = () => {
    return (
      <Nav className="navbar-nav mr-auto" navbar>
        <NavItem>
          <NavLink href="/sign-up">sign up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">log in</NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar color="light" light expand="md">
      <NavLink href="/" className="navbar-brand">
        Jobly
      </NavLink>
      {(user.username) ? loggedIn() : unauthed()}
    </Navbar>
  );
}