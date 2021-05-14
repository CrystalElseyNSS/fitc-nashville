import React, { useState, useContext, useRef } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./Calendar.css";

export function AddEvent() {
  const history = useHistory();
//   const { addEvent } = useContext(EventContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const addNewEvent = (e) => {
    e.preventDefault();
    const event = {
      title: title,
      description: description,
      start: start,
      end: end,
    };
    // addEvent(event).then(() => history.push("/"));
  };

  return (
    <Card className="eventForm">
      <CardBody>
        <h3 className="formTitle">Add an Event</h3>
        <Form onSubmit={addNewEvent}>
          <fieldset>
            <FormGroup>
              <Input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Name of event (ie. 'Community Work Day')"
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="description"
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Event description - What details do people need to know (ie. what to bring, are guests welcome, etc.)?"
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="start"
                type="text"
                onChange={(e) => setStart(e.target.value)}
                required
                placeholder="Start time"
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="end"
                type="text"
                placeholder="End time"
                onChange={(e) => setEnd(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="eventBtnContainer">
              <Button className="eventBtn">Add to Calendar</Button>
            </FormGroup>
            <FormGroup>
              <Button id="viewCalBtn">View Calendar</Button>
            </FormGroup>
          </fieldset>
        </Form>
      </CardBody>
    </Card>
  );
}
