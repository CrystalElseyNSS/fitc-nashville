import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Card, CardBody } from "reactstrap";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AddEventModal } from "./AddEventModal";
import { Event } from "./Event";
import { EventContext } from "../../providers/CalendarProvider";

export function CommunityCalendar() {
  const localizer = momentLocalizer(moment);
  const { allEvents, getAllEvents, getEventInfo, clickedEvent } = useContext(EventContext);
  const [addEventModal, setAddEventModal] = useState(false);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const toggleAddEventModal = () => setAddEventModal(!addEventModal);
  const toggleEventInfoModal = () => setEventInfoModal(!eventInfoModal);

  useEffect(() => {
    getAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showEvent = (id) => {
    getEventInfo(id)
    toggleEventInfoModal()
  }
  
  return (
    <>
      <section id="calendarPage">
        <div className="calendarContainer">
          <button id="addEventBtn" onClick={toggleAddEventModal}>
            {" "}
            +{" "}
          </button>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={allEvents}
            startAccessor={(e) => moment(e.start).toDate()}
            endAccessor={(e) => moment(e.end).toDate()}
            onSelectEvent={(e) => showEvent(e.id)}
          />
        </div>
      </section>
      <div>
        {allEvents.map((e) => {
          return <Event key={e.id} e={e} />;
        })}
      </div>
      <Modal isOpen={addEventModal} toggle={toggleAddEventModal}>
        <AddEventModal toggle={toggleAddEventModal} />
      </Modal>
      <Modal isOpen={eventInfoModal} toggle={toggleEventInfoModal}>
      <Card className="eventForm">
        <h3 className="formTitle">{clickedEvent.title}</h3>
        <CardBody>
          <p>{clickedEvent.description}</p>
          <p>{clickedEvent.start}</p>
          <p>{clickedEvent.end}</p>
        </CardBody>
      </Card>
      </Modal>
    </>
  );
}
