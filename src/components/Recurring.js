import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // maxWidth: 360,
    padding: theme.spacing(1),
    // width: 800,
  },
  paper: {
    height: 80,
    width: 120,
  },
  control: {
    padding: theme.spacing(1),
  },
}));

export default function Recurring({ expenses }) {
  const recurring = expenses.filter((exp) => exp.recurring);

  return (
    <>
      <Grid container className={classes.root} spacing={1}>
        <h2>{recurring[0].name}</h2>
      </Grid>
    </>
  );
}
