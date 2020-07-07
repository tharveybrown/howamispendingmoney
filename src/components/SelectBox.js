import React from "react";

const SelectBox = (props) => {
  const { type, name, handleChange, id } = props;
  return (
    <div className="form-label-group">
      <input
        // placeholder={placeholder}
        type={type}
        name={name}
        value={true}
        className="form-control"
        onChange={handleChange}
        id={id}
        required
      />
      Yes
      <input
        // placeholder={placeholder}
        type={type}
        name={name}
        value={false}
        className="form-control"
        onChange={handleChange}
        id={id}
        required
      />
      No
    </div>
  );
};

export default SelectBox;
