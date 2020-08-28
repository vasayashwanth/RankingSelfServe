import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ContextConfidence from "./ContextConfidence/ContextConfidence";

export default function VerticalTabs() {
  return (
    <>
      <Tab.Container transition={false} defaultActiveKey="first">
        <Row>
          <Col md="auto">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Context Confidence</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Core Property</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Source selection</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">Declarative Ranker</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ContextConfidence />
              </Tab.Pane>
              <Tab.Pane eventKey="second"></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}
