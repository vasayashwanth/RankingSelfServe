import React, { useState, useEffect } from "react";
import StructuredEditor from "./StructuredEditor";
import TextEditor from "./TextEditor";

import * as constants from "./ContextConfidenceConstants";

function CreateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AddNew() {
  const initialRowState = [
    { ...constants.defaultRowValues, id: CreateUUID(), iscomment: true },
    { ...constants.defaultRowValues, id: CreateUUID() }
  ];
  const initialGroupState = [
    {
      ...constants.defaultGroupValues,
      id: CreateUUID(),
      lines: [{ ...constants.defaultGroupLine, id: CreateUUID() }]
    }
  ];
  const [groupState, setGroupState] = useState([...initialGroupState]);
  const [rowState, setRowState] = useState([...initialRowState]);
  const [structured, setStructured] = React.useState(true);
  const [isCommited, setIsCommited] = React.useState(false);
  const [isPR, setIsPR] = React.useState(true);
  const [commitResult, setCommitResult] = React.useState(null);

  //For tabs in textarea
  useEffect(() => {
    var textareas = document.getElementsByTagName("textarea");
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
      textareas[i].onkeydown = function (e) {
        if (e.keyCode === 9 || e.which === 9) {
          e.preventDefault();
          var s = this.selectionStart;
          this.value =
            this.value.substring(0, this.selectionStart) +
            "\t" +
            this.value.substring(this.selectionEnd);
          this.selectionEnd = s + 1;
        }
      };
    }
  }, [groupState]);

  //maintain prev row pipelines and group them
  function overrideTextEditor() {
    let final = [];
    let prevRowPipelines = [];
    let temp = null;
    rowState.forEach((element, i) => {
      if (compare(element.pipelines, prevRowPipelines)) {
        temp.lines = [...temp.lines, { ...element }];
      } else {
        if (temp) final = [...final, temp];
        temp = {
          ...constants.defaultGroupValues,
          id: CreateUUID(),
          lines: [{ ...element }],
          pipelines: [...element.pipelines]
        };
      }
      prevRowPipelines = [...element.pipelines];
    });
    if (temp) final = [...final, temp];
    setGroupState(final);
  }
  function overrideStructuredEditor() {
    let final = [];
    groupState.forEach((item) => {
      let temp = item.lines.map((item2) => {
        return {
          ...item2,
          pipelines: item.pipelines
        };
      });
      final = [...final, ...temp];
    });
    setRowState(final);
  }
  function getIndex(items, value, property = "id") {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i][property].toString().toLowerCase() ===
        value.toString().toLowerCase()
      )
        return i;
    }
    return -1;
  }

  function deserialize(item, prevLines) {
    let lines = item.split("\n");
    return lines.map((item, index) => {
      let lineItems = item.split("\t"); //.filter((item) => item);
      console.log(lineItems);
      let obj = {
        ...constants.defaultGroupLine,
        id: index >= prevLines.length ? CreateUUID() : prevLines[index].id
      };
      if (item[0] !== constants.commentIdentifier) {
        for (let i = 0; i < constants.textBoxes.length; i++) {
          if (lineItems[i] != null) obj[constants.textBoxes[i]] = lineItems[i];
        }
      } else {
        obj.iscomment = true;
        for (let i = 0; i < constants.commentTextBoxes.length; i++) {
          if (lineItems[i] != null)
            obj[constants.commentTextBoxes[i]] = lineItems[i];
        }
      }

      return obj;
    });
  }

  function getParentId(event) {
    //console.log(event.target.id);
    return event.target.id.split(">")[0];
  }
  function compare(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.sort().every(function (value, index) {
        return value === array2.sort()[index];
      })
    );
  }
  //Group functions
  function handleAddGroup() {
    setGroupState([
      ...groupState,
      {
        ...constants.defaultGroupValues,
        id: CreateUUID(),
        lines: [{ ...constants.defaultGroupLine, id: CreateUUID() }]
      }
    ]);
  }

  function handleDuplicateGroup(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");

    let items = [...groupState];
    let index = getIndex(items, currentid, "id");

    setGroupState([
      ...items,
      {
        ...items[index],
        id: CreateUUID(),
        lines: items[index].lines.map((line) => {
          return { ...line, id: CreateUUID() };
        })
      }
    ]);
  }

  function handleChangeGroup(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");

    let items = [...groupState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No group with given id found");
    }

    let item = { ...items[index] };
    const parsedValues = deserialize(event.target.value, item.lines);
    item[
      event.target.getAttribute("name").toString().toLowerCase()
    ] = parsedValues;
    items[index] = item;
    setGroupState(items);
  }

  function handleDeleteGroup(event) {
    let currentid = getParentId(event);
    setGroupState(
      groupState.filter((item) => item.id.toString() !== currentid.toString())
    );
  }

  function handleChangeGroupCheckBox(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString().toLowerCase();
    let items = [...groupState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No row with given id found");
    }
    let item = { ...items[index] };
    var index2 = item.pipelines.indexOf(prop);
    if (index2 > -1) {
      item.pipelines = item.pipelines.filter(
        (item) => item.toLowerCase() !== prop
      );
    } else {
      item.pipelines = [...item.pipelines, prop];
    }
    items[index] = item;
    setGroupState(items);
  }
  function handleReset() {
    setGroupState([...initialGroupState]);
    setRowState([...initialRowState]);
    setStructured(true);
    setIsCommited(false);
  }

  //Row handlers
  function handleAddRow() {
    setRowState([
      ...rowState,
      {
        ...constants.defaultRowValues,
        id: CreateUUID()
      }
    ]);
  }
  function handleAddRowComment() {
    setRowState([
      ...rowState,
      {
        ...constants.defaultRowValues,
        id: CreateUUID(),
        iscomment: true
      }
    ]);
  }
  function handleDuplicateRow(event) {
    let currentid = getParentId(event);
    if (currentid == null) throw console.error("No parent id found");
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    setRowState([...items, { ...items[index], id: CreateUUID() }]);
  }

  function handleChangeRowElement(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString();
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    let item = { ...items[index] };
    //console.log(item);
    //console.log(prop);
    if (
      prop.toLowerCase() === "comment" &&
      event.target.value[0] !== constants.commentIdentifier
    ) {
      //console.log("came here");
      item[prop.toLowerCase()] =
        constants.commentIdentifier + event.target.value;
    } else {
      //console.log("came here2");
      console.log(event.target.value);
      if (event.target.value === "") item[prop.toLowerCase()] = null;
      else item[prop.toLowerCase()] = event.target.value;
    }

    items[index] = item;
    //console.log(items);
    setRowState(items);
  }
  function handleDeleteRow(event) {
    let currentid = getParentId(event);
    setRowState(
      rowState.filter((item) => item.id.toString() !== currentid.toString())
    );
  }
  function handleChangeRowCheckBox(event) {
    let currentid = getParentId(event);
    let prop = event.target.getAttribute("name").toString().toLowerCase();
    let items = [...rowState];
    let index = getIndex(items, currentid, "id");
    if (index <= -1) {
      throw console.error("No row with given id found");
    }
    let item = { ...items[index] };
    var index2 = item.pipelines.indexOf(prop);
    if (index2 > -1) {
      item.pipelines = item.pipelines.filter(
        (item) => item.toLowerCase() !== prop
      );
    } else {
      item.pipelines = [...item.pipelines, prop];
    }
    items[index] = item;
    setRowState(items);
  }
  function getCurrentTimeStamp() {
    let d = new Date();
    let current_timestamp =
      d.getDate() +
      "-" +
      d.getMonth() +
      "-" +
      d.getFullYear() +
      "_" +
      d.getHours() +
      "_" +
      d.getMinutes() +
      "_" +
      d.getSeconds();
    return current_timestamp;
  }

  useEffect(() => {
    if (isCommited) {
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiIzOWFjOGUxMy1iMWVhLTQ4NzgtOGQ1MS1lZGUwYzRhNTMwMTQiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk4ODc3NTU0LCJleHAiOjE1OTg4ODExNTR9.tYdo2Q8POWKwy0KZgpoZvLqdBe4uvh_O_-4ynVceKHNPNAuMmeaJ-RC1qaoQBajCJKOq1gsEV7iBVnYhSZNv2kJukN7-ayvtTaBvJ_84FSIhsAsXlHxX_oEdnAdGo3jIri9u957ODqM7KC5RkDZhE1U-E7o4q3GvAZdvaXP7Cp6AiWgDD9jxpEqgjors0CuIn8V3XyYFq_FahpApnabmu6bj4EemM0M7x5bARJRpatjMejOIkXf3W5dgfIZ_Metj_4dyG1SSFwDvBn6pe_FcNfAoM4-fH41OFV1zjarcIbWlRYX20qoUekhuCp1tP2bxAVTLNR-8BumN440_ZNlmLQ",
          GitParameters: {
            gitRepoName: "ConfigDataDummy",
            branchName: "{{current_timestamp}}",
            createPullRequest: true,
            commitMessage: "Commit at {{current_timestamp}}"
          },
          ContextConfidenceConfig: {
            configLines: [
              {
                pipelines: ["p0", "p0u"],
                id: "98fa5fd9-f61d-4670-9739-26a5ecd1e321",
                market: "*",
                context: 123,
                predicate: "default",
                language: "default",
                confidence: 0.35,
                contextname: null,
                iscomment: true,
                comment: ";enable freebase for p0 markets"
              },
              {
                pipelines: ["p0", "p0u"],
                id: "3b9cdc46-7ad0-4518-a72a-4e7e6f8d2515",
                market: "en-gb",
                context: "1498",
                predicate: "default",
                language: "default",
                confidence: 0.35,
                contextname: "freebase",
                iscomment: false,
                comment: ";"
              },
              {
                pipelines: ["p0", "p0u"],
                id: "aa78294b-e2c8-4944-bdbf-6d86a4d0146a",
                market: "en-ca",
                context: "1498",
                predicate: "default",
                language: "default",
                confidence: 0.35,
                contextname: "freebase",
                iscomment: false,
                comment: ";"
              }
            ]
          }
        })
      };
      fetch(
        "https://rankingselfserve.azurewebsites.net/Git/CommitToGit",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => setCommitResult(data));
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [isCommited]);
  return (
    <>
      <div>
        <button onClick={handleReset} className="btn btn-primary">
          Reset
        </button>
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="structured"
            checked={structured}
            onChange={() => {
              setStructured((c) => true);
              overrideStructuredEditor();
            }}
          />
          <label className="headings" htmlFor="structured">
            Structured Editor
          </label>
        </div>
        {structured ? (
          <StructuredEditor
            data={rowState}
            handleDuplicateRow={handleDuplicateRow}
            handleChangeRowElement={handleChangeRowElement}
            handleDeleteRow={handleDeleteRow}
            handleChangeRowCheckBox={handleChangeRowCheckBox}
            handleAddRow={handleAddRow}
            handleAddRowComment={handleAddRowComment}
          />
        ) : null}
      </div>
      <div>
        <div>
          <input
            type="radio"
            id="unstructured"
            checked={!structured}
            onChange={() => {
              setStructured((c) => false);
              overrideTextEditor();
            }}
          />
          <label className="headings" htmlFor="unstructured">
            Text Editor
          </label>
        </div>
        {structured ? null : (
          <>
            <TextEditor
              data={groupState}
              handleDuplicateGroup={handleDuplicateGroup}
              handleChangeGroup={handleChangeGroup}
              handleDeleteGroup={handleDeleteGroup}
              handleChangeGroupCheckBox={handleChangeGroupCheckBox}
            />
            <button onClick={handleAddGroup} className="btn btn-primary">
              Add new group
            </button>
          </>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="configLine">
        <label for="branch">Branch Name</label>
        <input type="text" id="branch" value={getCurrentTimeStamp()} />

        <button
          className="btn btn-primary"
          disabled={isCommited}
          onClick={() => {
            setIsCommited(true);
          }}
        >
          Commit
        </button>
        <div className="custom-control custom-switch">
          <input
            className="custom-control-input"
            id={"pr"}
            name={"pr"}
            type="checkbox"
            onChange={() => setIsPR((s) => !s)}
            checked={isPR}
          />

          <label className="custom-control-label" htmlFor={"pr"}>
            Create a Pull Request
          </label>
        </div>
      </div>
      <div>{commitResult ? <label>Result:{commitResult}</label> : null}</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <React.Fragment>{JSON.stringify(rowState, null, 2)}</React.Fragment>
    </>
  );
}
