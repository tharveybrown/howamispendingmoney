import React, { Component } from "react";
import Input from "./Input";
import axios from "axios";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
const url = runtimeEnv().REACT_APP_API_URL;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstName: "",
      // lastName: "",
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
      // first_name: firstName,
      // last_name: lastName,
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
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Log In</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <Input
                    placeholder="Email"
                    type="text"
                    handleChange={this.handleChange}
                    id="inputEmail"
                    name="email"
                    value={email}
                  />
                  <Input
                    placeholder="Password"
                    type="text"
                    handleChange={this.handleChange}
                    id="inputPassword"
                    name="password"
                    value={password}
                  />

                  <button
                    placeholder="submit"
                    className="btn btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <hr className="my-4"></hr>
                  <Link to="/signup">
                    <button
                      className="btn btn-lg btn-google btn-block text-uppercase"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </Link>
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
export default Login;
