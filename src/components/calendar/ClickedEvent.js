import React from "react";
import { Card, CardBody } from "reactstrap";

export function ClickedEvent(event) {
  return (
    <>
      <Card className="eventForm">
        <h3 className="formTitle">{event.title}</h3>
        <CardBody>
          <p>{event.description}</p>
          <p>{event.start}</p>
          <p>{event.end}</p>
        </CardBody>
      </Card>
    </>
  );
}
