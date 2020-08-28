import React from "react";
import InputCheckBox from "./InputCheckBox";
import InputText from "./InputText";
import * as constants from "./ContextConfidenceConstants";

export default function StructuredEditor(props) {
  return (
    <>
      {props.data.map((item) => (
        <Line
          key={item.id}
          data={item}
          handleDuplicateRow={props.handleDuplicateRow}
          handleChangeRowElement={props.handleChangeRowElement}
          handleDeleteRow={props.handleDeleteRow}
          handleChangeRowCheckBox={props.handleChangeRowCheckBox}
        />
      ))}
      <button className="btn btn-primary" onClick={props.handleAddRow}>
        Add default config line
      </button>
      <button className="btn btn-primary" onClick={props.handleAddRowComment}>
        Add a Comment
      </button>
    </>
  );
}

function Line(props) {
  return (
    <>
      <div className="configLine" id={props.data.id}>
        <button
          className="btn btn-success  btn-sm"
          key={props.data.id + ">duplicate"}
          id={props.data.id + ">duplicate"}
          onClick={props.handleDuplicateRow}
        >
          +
        </button>
        {
          <>
            {props.data.iscomment ? (
              <>
                {constants.commentTextBoxes.map((item) => (
                  <InputText
                    key={props.data.id + ">" + item}
                    label={item}
                    id={props.data.id + ">" + item}
                    name={item}
                    data={props.data[item]}
                    handleChangeRowElement={props.handleChangeRowElement}
                  />
                ))}
              </>
            ) : (
              <>
                {constants.textBoxes.map((item) => (
                  <InputText
                    key={props.data.id + ">" + item}
                    label={item}
                    id={props.data.id + ">" + item}
                    name={item}
                    data={props.data[item]}
                    handleChangeRowElement={props.handleChangeRowElement}
                  />
                ))}
              </>
            )}
          </>
        }

        {
          <>
            {constants.allPipelines.map((item) => (
              <InputCheckBox
                key={props.data.id + ">" + item}
                label={item}
                id={props.data.id + ">" + item}
                name={item}
                data={props.data.pipelines}
                handleChangeCheckBox={props.handleChangeRowCheckBox}
              />
            ))}
          </>
        }
        <button
          key={props.data.id + ">delete"}
          id={props.data.id + ">delete"}
          className="btn btn-danger  btn-sm"
          onClick={props.handleDeleteRow}
        >
          X
        </button>
      </div>
    </>
  );
}
