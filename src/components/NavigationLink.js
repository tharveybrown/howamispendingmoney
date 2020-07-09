import React from "react";
import { NavLink } from "react-router-dom";
// import "../styles/navbar.css";

const NavigationLink = ({ link, text, handleLogout }) => {
  return (
    <li className="nav-item active">
      <NavLink
        exact
        activeClassName="navbar__link--active"
        className="nav-link"
        to={link}
        onClick={handleLogout ? handleLogout : null}
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavigationLink;
