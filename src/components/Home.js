import React from "react";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import BankAuth from "./BankAuth";

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>

      <br></br>
      {props.loggedInStatus ? (
        <>
          <BankAuth />
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <br></br>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
};
export default Home;
