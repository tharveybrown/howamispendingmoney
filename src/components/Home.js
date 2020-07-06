import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import BankAuth from "./BankAuth";
// import { PlaidLink } from "react-plaid-link";

const url = runtimeEnv().REACT_APP_API_URL;

const Home = (props) => {
  const handleClick = () => {
    // axios
    //   .delete(`${url}/logout`, { withCredentials: true })
    //   .then((response) => {
    props.history.push("/");
    props.handleLogout();
    // })
    // .catch((error) => console.log(error));
  };

  return (
    <div>
      <Link to="/login">Log In</Link>
      <br></br>
      <Link to="/signup">Sign Up</Link>

      <br></br>
      {props.loggedInStatus ? (
        <>
          <Link to="/" onClick={handleClick}>
            Log Out
          </Link>
          <BankAuth />
          {/* <PlaidLink
            clientName="Your app name"
            env="sandbox"
            product={["auth", "transactions"]}
            publicKey="2718fb47792922b7cf3d78cb5c6b7d"
            onSuccess={onSuccess}
          >
            Connect a bank account
          </PlaidLink> */}
        </>
      ) : null}
    </div>
  );
};
export default Home;
