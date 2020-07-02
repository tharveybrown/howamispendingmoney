import React from "react";

const Input = (props) => {
  const { placeholder, type, name, handleChange, id, value } = props;
  console.log(props);
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
        required
      />

      <label for={id}>{placeholder}</label>
    </div>
  );
};

export default Input;
