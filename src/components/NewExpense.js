import React, { Component } from "react";
import Input from "./registrations/Input";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import axios from "axios";
import $ from "jquery";
import RadioBox from "./RadioBox";
import Switch from "./Switch";

const url = runtimeEnv().REACT_APP_API_URL;

let date = new Date();

class NewExpense extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      amount: 0,
      date: date,
      category: "",
      schedule: "",
      recurring: false,
      donation: false,
      isIncome: false,
      errors: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleToggle = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let {
      name,
      amount,
      date,
      category,
      schedule,
      recurring,
      donation,
      id,
      isIncome,
    } = this.state;
    const token = localStorage.getItem("token");

    amount = !isIncome ? amount * -1 : amount;
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
      .then((res) => {
        this.props.updateExpenseState(res.data);
        let modal = document.querySelector('[data-dismiss="modal"]');
        modal.click();
        return;
      })

      .catch((error) => {
        console.log("api errors:", error);
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
      isIncome,
    } = this.state;
    return (
      <>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          New Expense
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  New Expense
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <Switch
                    handleChange={this.handleToggle}
                    id="isIncome"
                    name="isIncome"
                    value={isIncome}
                    label="Income"
                  />
                  <Input
                    placeholder="Company / Organization Name"
                    type="text"
                    handleChange={this.handleChange}
                    id="inputName"
                    name="name"
                    value={name}
                    required={true}
                  />
                  <Input
                    placeholder="Amount"
                    type="amount"
                    handleChange={this.handleChange}
                    name="amount"
                    value={amount}
                    required={true}
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
                  {/* Is this a Donation? */}
                  <RadioBox
                    header="Is this a donation?"
                    type="radio"
                    handleChange={this.handleChange}
                    name="donation"
                    value={donation}
                    options={["yes", "no"]}
                  ></RadioBox>
                  <RadioBox
                    header="Is this a recurring expense?"
                    type="radio"
                    handleChange={this.handleChange}
                    name="recurring"
                    value={recurring}
                    options={["yes", "no"]}
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
                    required={false}
                  />
                  <button
                    placeholder="submit"
                    className="btn btn-primary btn-block text-uppercase"
                    type="submit"
                    onSubmit={this.handleSubmit}
                    // data-dismiss="modal"
                  >
                    Create New Expense
                  </button>
                </form>
                <div>{this.state.errors ? this.handleErrors() : null}</div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewExpense;
