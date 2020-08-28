import InputCheckBox from "./InputCheckBox";
import * as constants from "./ContextConfidenceConstants";
import React from "react";

export default function TextEditor(props) {
  function serialize(data) {
    return data
      .map((item) => {
        let goodItem = item.iscomment
          ? [...constants.commentTextBoxes]
          : [...constants.textBoxes];
        return (
          goodItem
            //.filter((prop) => prop)
            .map((prop) => item[prop])
            .filter((prop) => prop != null)
            .join("\t")
          //.trimEnd()
        );
      })
      .join("\n");
  }

  //Function to persist cursor position
  // function onChange(event) {
  //   const caret = event.target.selectionStart;
  //   const element = event.target;
  //   window.requestAnimationFrame(() => {
  //     element.selectionStart = caret;
  //     element.selectionEnd = caret;
  //   });
  // }
  return (
    <div>
      {props.data.map((item) => (
        <div className="configLine" key={item.id}>
          <button
            key={item.id + ">duplicate"}
            id={item.id + ">duplicate"}
            onClick={props.handleDuplicateGroup}
            className="btn btn-success  btn-sm"
          >
            +
          </button>
          <div>
            <textarea
              className="input-text-field"
              key={item.id + ">textarea"}
              id={item.id + ">textarea"}
              name={"lines"}
              rows={item.lines.length}
              value={serialize(item.lines)}
              onChange={(event) => {
                //onChange(event);
                props.handleChangeGroup(event);
              }}
            />
          </div>
          <>
            {constants.allPipelines.map((pipeline) => (
              <InputCheckBox
                key={item.id + ">" + pipeline}
                id={item.id + ">" + pipeline}
                label={pipeline}
                name={pipeline}
                data={item.pipelines}
                handleChangeCheckBox={props.handleChangeGroupCheckBox}
              />
            ))}
          </>
          <button
            key={item.id + ">delete"}
            id={item.id + ">delete"}
            onClick={props.handleDeleteGroup}
            className="btn btn-danger  btn-sm"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
