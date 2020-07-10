import React from "react";

const Input = (props) => {
  const { placeholder, type, name, handleChange, id, value, required } = props;
  return (
    <div className="form-label-group">
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        className="form-control"
        onChange={handleChange}
        id={id}
        required={required}
      />

      <label className="has-float-label" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
