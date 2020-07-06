import React from "react";
import { NavLink } from "react-router-dom";
// import "../styles/navbar.css";

const Navbar = ({ handleLogout }) => (
  <nav className="navbar">
    <NavLink
      exact
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/"
    >
      Home
    </NavLink>
    <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/expenses"
    >
      Expenses
    </NavLink>
    <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/logout"
      onClick={handleLogout}
    >
      Logout
    </NavLink>
    {/* <NavLink
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/contacts"
    >
      Contacts
    </NavLink> */}
  </nav>
);

export default Navbar;
