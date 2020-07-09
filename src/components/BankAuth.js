import React, { Component } from "react";
import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { PlaidLink } from "react-plaid-link";

let env = runtimeEnv();
const plaidPublicKey = env.REACT_APP_PLAID_PUBLIC_KEY;

console.log(env);

const BankAuth = (props) => {
  return (
    <div className="plaid-link">
      <PlaidLink
        clientName="Donation tracker"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey={plaidPublicKey}
        onSuccess={props.onSuccess}
      >
        Connect a bank account
      </PlaidLink>
    </div>
  );
  // }
};
export default BankAuth;
