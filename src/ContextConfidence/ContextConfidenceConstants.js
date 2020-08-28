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
export const defaultGroupLine = {
  id: "",
  market: null,
  context: null,
  predicate: null,
  language: null,
  confidence: null,
  contextname: null,
  iscomment: false,
  comment: commentIdentifier
};
export const defaultRowValues = {
  pipelines: [...allPipelines],
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

export const defaultGroupValues = {
  id: "",
  pipelines: [...allPipelines],
  lines: [defaultGroupLine]
};
