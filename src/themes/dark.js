import cyan from "@material-ui/core/colors/cyan";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import blueGrey from "@material-ui/core/colors/blueGrey";
import indigo from "@material-ui/core/colors/indigo";
import { withTheme } from "@material-ui/core";

const darktheme = {
  palette: {
    type: "dark",
    primary: blue,
    secondary: green,
    background: {
      default: "rgb(21, 32, 42)",
      paper: "rgb(28, 41, 55)",
    },
    transparent: {
      default: "rgba(21, 32, 42, 0%)",
      paper: "rgba(28, 41, 55, 0%)",
    },
    numbers: {
      red: red[400],
      blue: blue[400],
      green: green[400],
      yellow: "#FDD835",
    },
    // brand: {
    //   nomadlist: "rgb(255, 71, 66)",
    // },
    // cardheader: "rgba(255, 255, 255, 0.12)",
    // Define color per category in theme to adjust constrast
    default: {
      primary: blue,
      main: blue[800],
    },
    dashboard: {
      primary: green,
      main: blue[700],
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 14,
    htmlFontSize: 16,
  },
};

export { darktheme };
