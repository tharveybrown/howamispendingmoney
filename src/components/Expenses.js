import React, { Component } from "react";
import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Expense from "./Expense";

const url = runtimeEnv().REACT_APP_API_URL;

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: [],
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem("token");
    axios
      .get(`${url}/expenses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("RESPONSE", response);
        return this.setState({ expenses: response.data });
      })
      .catch((err) => console.log(err));
  }

  renderExpenses = () => {
    return this.state.expenses.map((expense) => {
      return <Expense expense={expense} />;
    });
  };

  render() {
    return (
      <div>
        <h3>Expenses</h3>
        {this.renderExpenses()}
      </div>
    );
  }
}

export default Expenses;
