import React, { Component } from "react";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import BankAuth from "./BankAuth";
import Expenses from "./Expenses";
import Summary from "./Summary";
import NewExpense from "./NewExpense";
import axios from "axios";

const url = runtimeEnv().REACT_APP_API_URL;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spent: 0,
      donated: 0,
      income: 0,
      total: 0,
      expenses: [],
      purchases: [],
      donations: [],
      categories: [],
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
          let donationsOnly = response.data.filter((exp) => exp.donation);

          let donations = Object.values(
            donationsOnly.reduce((a, { date, amount }) => {
              a[date] = a[date] || { date, amount: 0 };
              a[date].amount = String(Number(a[date].amount) + Number(amount));

              return a;
            }, {})
          );

          let purchasesOnly = response.data.filter(
            (exp) => !exp.donation && exp.amount < 0
          );

          let purchases = Object.values(
            purchasesOnly.reduce((a, { date, amount }) => {
              a[date] = a[date] || { date, amount: 0 };
              a[date].amount = String(Number(a[date].amount) + Number(amount));

              return a;
            }, {})
          );

          let categoryArray = Object.values(
            purchasesOnly.reduce((a, { category, amount }) => {
              a[category] = a[category] || { category, amount: 0 };
              a[category].amount = String(
                Number(a[category].amount) + Number(amount)
              );

              return a;
            }, {})
          );

          let currentDonated = donationsOnly
            .map((d) => d.amount)
            .reduce((a, b) => a + b);
          let currentSpent = purchasesOnly
            .map((d) => d.amount)
            .reduce((a, b) => a + b);
          let currentIncome = response.data
            .filter((exp) => exp.amount > 0)
            .map((exp) => exp.amount)
            .reduce((sum, val) => sum + val, this.state.income);
          let currentTotal = currentIncome + currentDonated + currentSpent;

          return this.setState({
            expenses: response.data,
            purchases: purchases,
            donations: donations,
            categories: categoryArray,
            spent: Math.round(currentSpent * 100) / 100,
            total: Math.round(currentTotal * 100) / 100,
            income: Math.round(currentIncome * 100) / 100,
            donated: Math.round(currentDonated * 100) / 100,
          });
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

  updateExpenseState = (expense) => {
    return this.setState((previousState) => {
      return {
        expenses: [...previousState.expenses, expense],
      };
    });
  };

  updateExpenses = (expense) => {
    const authToken = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .patch(`${url}/expenses/${expense.id}`, expense, config)
      .then((res) => {
        const elementsIndex = this.state.expenses.findIndex(
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
      <div id="container">
        <div className="layout">
          <br></br>
          {this.props.loggedInStatus ? (
            <div className="show_transactions transactions_two_columns">
              <div className="transactions_aside">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {this.state.expenses.length > 0 ? (
                    <Summary
                      donations={this.state.donations}
                      purchases={this.state.purchases}
                      donated={this.state.donated}
                      income={this.state.income}
                      spent={this.state.spent}
                      total={this.state.total}
                      categories={this.state.categories}
                    />
                  ) : null}
                </div>
              </div>
              <div className="layout_noscroll">
                <div className="container-fluid">
                  <div class="row">
                    <div className="col-md">
                      <NewExpense
                        updateExpenseState={this.updateExpenseState}
                      />
                    </div>
                    <div className="col-sm">
                      <BankAuth onSuccess={this.onSuccess} />
                    </div>
                  </div>
                </div>

                <Expenses
                  expenses={this.state.expenses}
                  onEdit={this.updateExpenses}
                />
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <br></br>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
