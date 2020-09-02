import React, { useEffect } from "react";
// import * as constants from "./ContextConfidenceConstants";

import GitResult from "./GitResult";
import GitParams from "./GitParams";

export default function GitCommit({ state, gitState, setGitState }) {
  useEffect(() => {
    function fetchData() {
      if (gitState.isCommited) {
        let data = {
          AccessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiJlODcyNTZjZi04ZDAyLTYyMzMtODZkNS0xMWZjNDBlMTIyYmQiLCJzY3AiOiJ2c28uY29kZV9tYW5hZ2UiLCJhdWkiOiJiNWJiODVmNS1jNTBkLTQyYTAtOGIyZi00NjYxNTAzNmJjMzYiLCJhcHBpZCI6ImUxN2Q2ZmQ3LTc3YzItNDBlZS1iNzg3LWJiNjI1ZGNhOTU0OCIsImlzcyI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJhdWQiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwibmJmIjoxNTk5MDYyMTc3LCJleHAiOjE1OTkwNjU3Nzd9.wiaKynxeLkZp-q2OI6ytzZs1ssdMW6NIv4pD1F_Kj_eiuLy1l0wiDkQpBS-MIhUqzKQmKxj7FdL_MMEn_A5RVTWUx2UPsUAGMXo-U87MPq8NugxaD0IGqOFbZw0OvsHe0N4y__qMxeqIRHbMUtAwMenvNjDlHNQaGm5G0eCguGLjCg7WJzWSHoyGvF4huk6_jNMUMnJgisSDTMXpJOYCLxu4qtqOn1l2uqkDclh0y9oisDAIrTQm-ghbqLay6LMxtp4QMJ_nOzDGSjLfa0uiViZlize9jlLtSyqTW-H7Dos6tNvxsXsNzLnFfkacZ_EtE-d9V3jTOkjqesneOvtg1Q",
          GitParameters: {
            gitRepoName: gitState.gitRepoName,
            branchName: gitState.branchName,
            createPullRequest: gitState.isPullRequestNeeded,
            commitMessage: gitState.commitMessage
          },
          ContextConfidenceConfig: {
            configLines: state
          }
        };

        setGitState({ ...gitState, waitingResult: "Submitting..." });
        fetch("https://rankingselfserve.azurewebsites.net/Git/CommitToGit", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((json) => {
            setGitState({ ...gitState, waitingResult: null });
            setGitState({ ...gitState, commitResult: json });
          });
      }
    }
    fetchData();
  }, [gitState.isCommited]);

  return (
    <>
      {" "}
      <GitParams state={gitState} setState={setGitState} />
      <br />
      <hr />
      <GitResult state={gitState} />
    </>
  );
}
