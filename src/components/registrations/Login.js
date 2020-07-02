import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
const url = runtimeEnv().REACT_APP_API_URL;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: "",
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
    const { firstName, lastName, email, password } = this.state;
    let user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    axios
      .post(`${url}/login`, { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch((error) => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <input
            placeholder="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to="/signup">sign up</Link>
          </div>
        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Login;
