import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioBox = (props) => {
  const { value, options, name, handleChange, id, header } = props;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{header}</FormLabel>
      <RadioGroup
        aria-label="gender"
        value={value}
        name="gender1"
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              name={name}
              value={option}
              control={<Radio />}
              label={option}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBox;
