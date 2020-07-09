import React, { Component } from "react";
import Input from "./registrations/Input";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import axios from "axios";
import RadioBox from "./RadioBox";
import ExpenseSelect from "./ExpenseSelect";

const url = runtimeEnv().REACT_APP_API_URL;

let date = new Date();

class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: 0,
      date: date,
      category: "",
      schedule: "",
      recurring: false,
      donation: false,
      errors: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      amount,
      date,
      category,
      schedule,
      recurring,
      donation,
      id,
    } = this.state;
    const token = localStorage.getItem("token");
    axios
      .post(
        `${url}/expenses`,
        { name, amount, date, category, schedule, recurring, donation, id },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data)
      .then((data) => {
        this.props.handleLogin(data.user);
        this.redirect();
      })
      .catch((error) => {
        console.log("api errors:", error);
        this.setState({
          errors: error,
        });
      });
  };
  redirect = () => {
    this.props.history.push("/");
  };

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}> {error}</li>;
          })}
        </ul>
      </div>
    );
  };

  render() {
    const {
      name,
      amount,
      date,
      category,
      schedule,
      recurring,
      donation,
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Create a New Expense</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <Input
                    placeholder="Company/ Organization Name"
                    type="text"
                    handleChange={this.handleChange}
                    id="inputName"
                    name="name"
                    value={name}
                  />
                  <Input
                    placeholder="Amount"
                    type="amount"
                    handleChange={this.handleChange}
                    name="amount"
                    value={amount}
                  />
                  <Input
                    placeholder="Date"
                    type="date"
                    handleChange={this.handleChange}
                    id="inputDate"
                    name="date"
                    value={date}
                  />
                  <Input
                    placeholder="Expense Category"
                    type="category"
                    handleChange={this.handleChange}
                    id="inputCategory"
                    name="category"
                    value={category}
                  />
                  Is this a Donation?
                  <RadioBox
                    type="radio"
                    handleChange={this.handleChange}
                    name="donation"
                    value={donation}
                  ></RadioBox>
                  Is this a recurring expense?
                  <RadioBox
                    type="radio"
                    handleChange={this.handleChange}
                    name="recurring"
                    value={recurring}
                  ></RadioBox>
                  {/* <ExpenseSelect 
                    handleChange={this.handleChange}
                    value={category} >
                    </ExpenseSelect> */}
                  <Input
                    placeholder="How often does this expense occur?"
                    type="schedule"
                    handleChange={this.handleChange}
                    id="inputSchedule"
                    name="schedule"
                    value={schedule}
                  />
                  <button
                    placeholder="submit"
                    className="btn btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Create New Expense
                  </button>
                </form>
                <div>{this.state.errors ? this.handleErrors() : null}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewExpense;
