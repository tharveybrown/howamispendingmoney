import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioBox = (props) => {
  // const [value, setValue] = React.useState('female');

  const { type, name, handleChange, id, header } = props;
  return (
    // const handleChange = (event) => {
    //   setValue(event.target.value);
    // };

    // return (
    //   <FormControl component="fieldset">
    //     <FormLabel component="legend">{header}</FormLabel>
    //     <RadioGroup
    //       aria-label={name}
    //       name="gender1"
    //       value={value}
    //       onChange={handleChange}
    //     >
    //       {options.map((option) => {
    //         return (
    //           <FormControlLabel
    //             value={option == "yes" ? true : false}
    //             name={name}
    //             control={<Radio />}
    //             label={option}
    //           />
    //         );
    //       })}
    //     </RadioGroup>
    //   </FormControl>
    // );
    <div className="form-label-group">
      <legend className="col-form-label ">{header}</legend>
      <div className="col-sm-10">
        <div className="form-check">
          <input
            type={type}
            name={name}
            value={true}
            className="form-check-input"
            onChange={handleChange}
            id={id}
          />
          <label className="form-check-label" for={id}>
            Yes
          </label>
        </div>
        <div className="form-check">
          <input
            type={type}
            name={name}
            value={false}
            className="form-check-input"
            onChange={handleChange}
            id={id}
          />
          <label className="form-check-label" for={id}>
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioBox;
