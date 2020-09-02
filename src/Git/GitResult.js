import capitalize from "capitalize-first-letter";
import React from "react";

export default function GitResult(props) {
  return (
    <>
      <div>{props.state.waitingResult}</div>
      <div>
        {props.state.commitResult ? (
          <>
            {Object.keys(props.state.commitResult).map((key) => (
              <div key={key}>
                <label>
                  <b>{capitalize(key)} : </b>
                </label>
                {props.state.commitResult[key].startsWith("http") ? (
                  <a href={props.state.commitResult[key]}>
                    {props.state.commitResult[key]}
                  </a>
                ) : (
                  <label>{props.state.commitResult[key]}</label>
                )}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
