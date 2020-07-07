import React from "react";
import { NavLink } from "react-router-dom";
import NavigationLink from "./NavigationLink";

// import "../styles/navbar.css";

<<<<<<< HEAD
const Navbar = ({ handleLogout, loggedInStatus }) => {
  console.log(loggedInStatus);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#">
          smarter spending
        </a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <NavigationLink link="/" text="Home" />

          {loggedInStatus ? (
            <>
              {/* <NavigationLink link="/expenses" text="Expenses" /> */}
              <NavigationLink
                link="/login"
                text="Logout"
                handleLogout={handleLogout}
              />
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};
=======
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
      exact
      activeClassName="navbar__link--active"
      className="navbar__link"
      to="/new"
    >
      New Expense
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
>>>>>>> master

export default Navbar;
