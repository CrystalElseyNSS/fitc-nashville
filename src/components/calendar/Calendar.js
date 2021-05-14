import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AddEvent } from "./AddEvent";

const localizer = momentLocalizer(moment);

export function CommunityCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        description: "",
        title: "Community Work Days",
      },
    ]);
  }, []);

  return (
    <>
      <section id="calendarPage">
        <AddEvent />
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
        />
      </section>
    </>
  );
}
