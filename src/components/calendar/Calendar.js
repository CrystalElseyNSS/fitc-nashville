import React, { useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AddEvent } from "./AddEvent";
import { EventContext } from "../../providers/CalendarProvider";

export function CommunityCalendar() {
  const localizer = momentLocalizer(moment);

  const { allEvents, getAllEvents } = useContext(EventContext);
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <section id="calendarPage">
        <AddEvent />
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={allEvents}
          startAccessor={(e) => moment(e.start).toDate()}
          endAccessor={(e) => moment(e.end).toDate()}
        />
      </section>
      <div>
        {allEvents.map((e) => {
          return (
            <>
              <div className="event" key={e.id}>
                <p>{e.title}</p>
                <p>{e.description}</p>
                <p>{e.start}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
