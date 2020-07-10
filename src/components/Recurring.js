import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RepeatIcon from "@material-ui/icons/Repeat";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "400px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Recurring({ recurring }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`${classes.root} accordian-box`} maxHeight={100}>
      <Typography variant="h5" gutterBottom>
        <RepeatIcon color="secondary" />
        Recurring Expenses
      </Typography>
      {recurring.length
        ? recurring.map((exp, i) => {
            return (
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}bh-content`}
                  id={`panel${i}bh-header`}
                >
                  <Typography className={classes.heading}>
                    {exp.name}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    $ {exp.amount}
                  </Typography>
                  <Typography
                    className={classes.heading}
                    variant="button"
                    align="right"
                    display="block"
                    gutterBottom
                  >
                    {exp.donation ? (
                      <span class="badge badge-success">Donation</span>
                    ) : (
                      <span class="badge badge-warning">Expense</span>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="button" display="block" gutterBottom>
                    {exp.date} {exp.schedule}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })
        : null}
    </div>
  );
}
