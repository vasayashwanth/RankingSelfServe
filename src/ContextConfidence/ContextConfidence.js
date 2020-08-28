import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddNew from "./AddNew";

export default function ContextConfidence() {
  return (
    <Tabs defaultActiveKey="1" transition={false} className="horizontal-tabs">
      <Tab eventKey="1" className="headings" title="Add New">
        <AddNew />
      </Tab>
      <Tab eventKey="2" className="headings" title="Query">
        <br />
        <h3>Coming Soon!!!</h3>
      </Tab>
    </Tabs>
  );
}
