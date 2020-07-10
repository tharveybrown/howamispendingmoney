import React from "react";
import { NavLink } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import Toggle from "./Toggle";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

const Navbar = ({ handleLogout, loggedInStatus, toggleTheme, theme }) => {
  const classes = useStyles();
  return (
    <nav
      className={`${classes.root} navbar navbar-expand-lg navbar-light`}
      style={{ background: "#FFE973" }}
      // style={{background-color: '#FFE973'}}
    >
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
              <NavigationLink link="/resources" text="Resources" />

              <NavigationLink
                link="/login"
                text="Logout"
                handleLogout={handleLogout}
              />
            </>
          ) : null}
        </ul>
        <div className="nav-item">
          <Toggle toggleTheme={toggleTheme} theme={theme}>
            Toggle theme
          </Toggle>
        </div>
        <div className="nav-item">
          <a
            target="_blank"
            className="nav-link"
            href="https://github.com/tharveybrown"
          >
            <GitHubIcon color="secondary" />
            &nbsp;&nbsp;@tharveybrown
          </a>
        </div>
        <div className="nav-item">
          <a
            target="_blank"
            className="nav-link"
            href="https://github.com/MagdalenaJasmine"
          >
            <GitHubIcon color="secondary" />
            &nbsp;&nbsp;@MagdalenaJasmine
          </a>
          {/* https://github.com/MagdalenaJasmine */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
