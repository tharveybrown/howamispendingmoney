import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

export default function SwitchesGroup(props) {
  const { name, isIncome, handleToggle, label } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Transaction Type</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={isIncome} onChange={handleToggle} name={name} />
          }
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}
