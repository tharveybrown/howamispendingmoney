import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpenseChart from "./ExpenseChart";
import CategoryChart from "./CategoryChart";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // ...theme.typography.button,
    // backgroundColor: theme.palette.background.default,
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

export default function Summary({
  donations,
  purchases,
  donated,
  spent,
  total,
  income,
  categories,
}) {
  const [spacing, setSpacing] = React.useState(6);
  const classes = useStyles();

  // const donations = expenses.map(exp => )

  // console.log("PROPS", props);
  return (
    <>
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid key="donated" item>
              <Paper elevation={3} className={classes.paper}>
                <div className={classes.root}>Donated</div>
                <h6 className={classes.root}>{donated}</h6>
              </Paper>
            </Grid>
            <Grid key="spent" item>
              <Paper elevation={3} className={classes.paper}>
                <div className={classes.root}>Spent</div>
                <h6 className={classes.root}>{spent}</h6>
              </Paper>
            </Grid>
            <Grid key="income" item>
              <Paper elevation={3} className={classes.paper}>
                <div className={classes.root}>Income</div>
                <h6 className={classes.root}>{income}</h6>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <ExpenseChart donations={donations} purchases={purchases} />
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <CategoryChart categories={categories} />
        </Grid>
      </Grid>
    </>
  );
}
