import React from "react";
import { NavLink } from "react-router-dom";
// import "../styles/navbar.css";

const Navbar = ({ handleLogout, loggedInStatus }) => {
  console.log(loggedInStatus);
  return (
    <nav className="navbar">
      <NavLink
        exact
        activeClassName="navbar__link--active"
        className="navbar__link"
        to="/"
      >
        Home
      </NavLink>
      {loggedInStatus ? (
        <>
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
            to="/login"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
