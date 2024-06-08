import React, { memo } from "react";
import "./ui.css";
import { FaCheck } from "react-icons/fa6";

export const Checkbox = memo((props) => {
  const { name = null, value = null, onChange = null } = props;
  return (
    <label className="ui-checkbox">
      {onChange ? (
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          hidden
        />
      ) : (
        <input type="checkbox" name={name} value={value} hidden />
      )}
      <FaCheck />
      <span></span>
    </label>
  );
});
