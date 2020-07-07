import React, { Component } from "react";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import BankAuth from "./BankAuth";
import Expenses from "./Expenses";
import axios from "axios";

const url = runtimeEnv().REACT_APP_API_URL;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      errors: [],
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem("token");
    if (authToken) {
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
  }
  onSuccess = (token, metadata) => {
    const authToken = localStorage.getItem("token");
    axios
      .post(
        `${url}/authlogin`,

        { token },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("RESPONSE", response);
        return response.data;
      })
      .then(({ access_token }) => {
        localStorage.setItem("access_token", access_token);
        return this.fetchTransactions(access_token, authToken);
      })
      .catch((err) => console.log(err));
  };

  fetchTransactions = (access_token, authToken) => {
    // debugger;
    axios
      .post(
        `${url}/transactions`,
        { access_token },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) =>
        this.setState((previousState) => {
          return {
            expenses: [...previousState.expenses, res.data.transactions],
          };
        })
      );
  };

  updateExpenses = (expense) => {
    const authToken = localStorage.getItem("token");
    console.log(expense);
    let config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .patch(`${url}/expenses/${expense.id}`, expense, config)
      .then((res) => {
        const elementsIndex = this.state.expense.findIndex(
          (element) => element.id == res.data.id
        );
        let previousState = [...this.state.expenses];
        previousState[elementsIndex] = res.data;
        return this.setState({
          expenses: previousState,
        });
      })
      .catch((err) =>
        this.setState((previousState) => {
          return {
            errors: [...previousState.errors, err],
          };
        })
      );
  };

  render() {
    return (
      <div>
        <h1>Home</h1>

        <br></br>
        {this.props.loggedInStatus ? (
          <>
            <BankAuth onSuccess={this.onSuccess} />
            <Expenses
              expenses={this.state.expenses}
              onEdit={this.updateExpenses}
            />
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
  }
}
export default Home;
