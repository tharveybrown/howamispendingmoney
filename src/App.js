// import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/registrations/Login";
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense";
import Signup from "./components/registrations/Signup";
import "./App.css";
import "./index.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Navbar from "./components/Navbar";

const url = runtimeEnv().REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }
  componentDidMount() {
    this.useEffect();
  }

  handleAuthClick = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${url}/user_is_authed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resp.json())
      .then((data) => console.log("APP DATA", data));
  };

  useEffect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${url}/auto_login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => resp.data)
        .then((data) => {
          this.setState({ user: data, isLoggedIn: true });
          // console.log(data)
        });
    }
  };

  handleLogin = (data) => {
    console.log("Login data", data);
    this.setState({
      isLoggedIn: true,
      user: data,
    });
  };
  handleLogout = () => {
    localStorage.clear();
    // props.history.push("/");
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  render() {
    return (
      <div>
        {/* <Routes props={this.props} /> */}
        <BrowserRouter>
          <Navbar handleLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/logout" handleLogout={this.handleLogout} />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route exact path="/expenses" component={Expenses} />
            <Route
              exact
              path="/new"
              render={(props) => (
                <NewExpense
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
