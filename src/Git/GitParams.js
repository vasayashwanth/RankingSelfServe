import React from "react";

export default function GitParams(props) {
  return (
    <>
      <div className="configLine">
        <label htmlFor="commitMessage">Commit Message</label>
        <input
          type="text"
          id="commitMessage"
          size={
            props.state.commitMessage === null
              ? 10
              : Math.max(10, props.state.commitMessage.length + 1)
          }
          onChange={(e) =>
            props.setState({ ...props.state, commitMessage: e.target.value })
          }
          value={props.state.commitMessage}
        />
        <label htmlFor="branch">Branch Name</label>
        <input
          type="text"
          id="branch"
          size={
            props.state.branchName === null
              ? 10
              : Math.max(10, props.state.branchName.length + 1)
          }
          onChange={(e) =>
            props.setState({ ...props.state, branchName: e.target.value })
          }
          value={props.state.branchName}
        />
      </div>
      <div className="configLine">
        <button
          className="btn btn-primary"
          disabled={props.state.isCommited}
          onClick={() => {
            props.setState({ ...props.state, isCommited: true });
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
            onChange={() =>
              props.setState({
                ...props.state,
                isPullRequestNeeded: !props.state.isPullRequestNeeded
              })
            }
            checked={props.state.isPullRequestNeeded}
          />

          <label className="custom-control-label" htmlFor={"pr"}>
            Create a Pull Request
          </label>
        </div>

        <div className="custom-control custom-switch">
          <input
            className="custom-control-input"
            id={"repo"}
            name={"repo"}
            type="checkbox"
            onChange={() =>
              props.state.gitRepoName === "ConfigDataDummy"
                ? props.setState({
                    ...props.state,
                    gitRepoName: "SatoriData"
                  })
                : props.setState({
                    ...props.state,
                    gitRepoName: "ConfigDataDummy"
                  })
            }
            checked={props.state.gitRepoName === "ConfigDataDummy"}
          />

          <label className="custom-control-label" htmlFor={"repo"}>
            Repo : {props.state.gitRepoName}
          </label>
        </div>
      </div>
    </>
  );
}
