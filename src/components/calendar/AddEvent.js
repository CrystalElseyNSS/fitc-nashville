import React, { useState, useContext, useRef } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from "reactstrap";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { EventContext } from "../../providers/CalendarProvider";

export function AddEvent() {
  const { addNewEvent } = useContext(EventContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState();
  const startDate = useRef()
  const endDate = useRef()

  const addEvent = (e) => {
    e.preventDefault();
    const event = {
      title: title,
      description: description,
      start: start,
      end: end,
    };
    addNewEvent(event)
  };

  return (
    <Card className="eventForm">
      <CardBody>
        <h3 className="formTitle">Add an Event</h3>
        <Form onSubmit={addEvent}>
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
            {/* <FormGroup>
              <Input
                id="start"
                type="text"
                onChange={(e) => setStart(e.target.value)}
                required
                placeholder="Start time"
              />
            </FormGroup> */}

            <FormGroup>
              <div required ref={startDate}>
                {
                  <DatePicker
                    placeholderText="Start time"
                    showTimeSelect
                    selected={start}
                    onChange={(dateEntered) => setStart(dateEntered)}
                    className="form-control"
                  />
                }
              </div>
            </FormGroup>

            <FormGroup>
              <div required ref={endDate}>
                {
                  <DatePicker
                    placeholderText="End time"
                    showTimeSelect
                    selected={end}
                    className="form-control"
                    onChange={(dateEntered) => setEnd(dateEntered)}
                  />
                }
              </div>
            </FormGroup>

            {/* <FormGroup>
              <Input
                id="end"
                type="text"
                placeholder="End time"
                onChange={(e) => setEnd(e.target.value)}
              />
            </FormGroup> */}

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
