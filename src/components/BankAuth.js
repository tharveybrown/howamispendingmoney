import React, { Component } from "react";
import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { PlaidLink } from "react-plaid-link";

const url = runtimeEnv().REACT_APP_API_URL;
// const { plaidPublicKey } = process.env.PLAID_PUBLIC_KEY;
console.log(process.env);
// console.log(plaidPublicKey);

class BankAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    };
  }
  handleClick = () => {
    axios
      .delete(`${url}/logout`, { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };
  onSuccess = (token, metadata) => {
    axios
      .post(`${url}/authlogin`, { token }, { withCredentials: true })
      .then((response) => {
        console.log("RESPONSE", response);
        return response.data;
      })
      .then(({ access_token }) => {
        localStorage.setItem("access_token", access_token);
        return this.fetchTransactions(access_token);
      })
      .catch((err) => console.log(err));
  };

  fetchTransactions = (access_token) => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };
    axios
      .get(`${url}/transactions`, config, { withCredentials: true })
      .then((res) =>
        this.setState({
          transactions: res.data.transactions,
        })
      );
  };

  render() {
    return (
      <div>
        <PlaidLink
          clientName="Your app name"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="2718fb47792922b7cf3d78cb5c6b7d"
          onSuccess={this.onSuccess}
        >
          Connect a bank account
        </PlaidLink>
      </div>
    );
  }
}
export default BankAuth;
