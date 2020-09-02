export const allPipelines = ["p0", "p0u", "p1", "p2"];
export const textBoxes = [
  "market",
  "context",
  "predicate",
  "language",
  "confidence",
  "contextname"
];
export const commentIdentifier = ";";
export const commentTextBoxes = ["comment"];
export const defaultLine = {
  id: "",
  market: "*",
  context: 123,
  predicate: "default",
  language: "default",
  confidence: 0.35,
  contextname: null,
  iscomment: false,
  comment: commentIdentifier
};
export const defaultRowValues = {
  ...defaultLine,
  pipelines: [...allPipelines]
};

export const defaultGroupValues = {
  id: "",
  pipelines: [...allPipelines],
  lines: [defaultLine]
};

export const gitParams = {
  commitMessage: "This is a sample commit message",
  isCommited: false,
  isPullRequestNeeded: true,
  commitResult: null,
  waitingResult: null,
  gitRepoName: "ConfigDataDummy"
};
