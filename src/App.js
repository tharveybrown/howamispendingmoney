// import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";
import "./App.css";
import "./index.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const url = runtimeEnv().REACT_APP_API_URL;

// function App() {
//   const [user, setUser] = useState({});
//   const [form, setForm] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get(`${url}/auto_login`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((resp) => resp.json())
//         .then((data) => {
//           setUser(data);
//           // console.log(data)
//         });
//     }
//   }, []);

//   const handleLogin = (user) => {
//     setUser(user);
//   };

//   const handleFormSwitch = (input) => {
//     setForm(input);
//   };

//   console.log(user);

//   const renderForm = () => {
//     switch (form) {
//       case "login":
//         return <Login handleLogin={handleLogin} />;
//         break;
//       default:
//         return <Signup handleLogin={handleLogin} />;
//     }
//   };
//   return (
//     <div className="App">
//       {renderForm()}
//       <button onClick={handleAuthClick} className="ui button">
//         Access Authorized Route
//       </button>
//     </div>
//   );
// }

// export default App;

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
      .then((data) => console.log(data));
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
    console.log(data);
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

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
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
          </Switch>
        </BrowserRouter>
      </div>
      // <div>Hello</div>
    );
  }
}
export default App;
