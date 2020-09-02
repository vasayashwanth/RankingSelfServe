import React from "react";
export default function InputText(props) {
  return (
    <div className="input-text-container">
      <label className="input-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="input-text-field class2"
        id={props.id}
        size={
          props.data === null || props.data === "undefined"
            ? 10
            : Math.max(10, props.data.toString().length + 1)
        }
        name={props.name}
        type="text"
        value={props.data === null ? "" : props.data}
        onChange={props.handleChangeRowElement}
      />
    </div>
  );
}
