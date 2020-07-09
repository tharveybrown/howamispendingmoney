// import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/registrations/Login";
import NewExpense from "./components/NewExpense";
import Signup from "./components/registrations/Signup";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import "./App.css";
// import "./index.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import Navbar from "./components/Navbar";
import ResourcesContainer from "./components/resources/ResourcesContainer";

const url = runtimeEnv().REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      expenses: [],
      theme: "light",
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
      .then((resp) => resp.json());
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
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  toggleTheme = () => {
    if (this.state.theme === "light") {
      this.setState({ theme: "dark" });
    } else {
      this.setState({ theme: "light" });
    }
  };

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <>
          <GlobalStyles />
          <BrowserRouter>
            <Navbar
              theme={this.state.theme}
              toggleTheme={this.toggleTheme}
              loggedInStatus={this.state.isLoggedIn}
              handleLogout={this.handleLogout}
            />
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

              <Route
                exact
                path="/resources"
                render={(props) => (
                  <ResourcesContainer
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
