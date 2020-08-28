import React from "react";
export default function InputCheckBox(props) {
  return (
    <>
      <div className="custom-control custom-switch">
        <input
          className="custom-control-input"
          id={props.id}
          name={props.name}
          type="checkbox"
          onChange={props.handleChangeCheckBox}
          checked={props.data.indexOf(props.label.toLowerCase()) > -1}
        />

        <label className="custom-control-label" htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    </>
  );
}
