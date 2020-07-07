import React from "react";

const SelectBox = (props) => {
  const { placeholder, type, name, handleChange, id, value } = props;
  return (
    <div className="form-label-group">
      <select
        // placeholder={placeholder}
        // type={type}
        // name={name}
        // value={value}
        className="form-control"
        onChange={handleChange}
        // id={id}
        // required
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    </div>
  );
};

export default SelectBox;
