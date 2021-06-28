import React, { useState, useContext, useRef } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from "reactstrap";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { EventContext } from "../../providers/CalendarProvider";

export function EventInfoModal(e) {
  
  return (
    <Card className="eventForm">
      <CardBody>
        <h3 className="formTitle">Add an Event</h3>
        <div className="event" id={id} key={e.id}>
        <p>{e.title}</p>
        <p>{e.description}</p>
        <p>{e.start}</p>
      </div>
      </CardBody>
    </Card>
  );
}
