import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const EventContext = createContext();

export function EventProvider(props) {
  const functionsApiUrl =
    "https://us-central1-fitc-nashville.cloudfunctions.net";
  const [allEvents, setAllEvents] = useState([]);
  const [clickedEvent, setClickedEvent] = useState({})
  const getToken = () => firebase.auth().currentUser.getIdToken();

  const addNewEvent = (gardener) => {
    return getToken().then((token) =>
      fetch(`${functionsApiUrl}/addNewEvent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gardener),
      }).then(getAllEvents)
    );
  };

  const getAllEvents = () => {
    getToken().then((token) =>
      fetch(`${functionsApiUrl}/getAllEvents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setAllEvents)
    );
  };

  const getEventInfo = (id) => {
    getToken().then((token) =>
      fetch(`${functionsApiUrl}/getEventInfo?id=${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setClickedEvent)
    );
  };

  return (
    <EventContext.Provider
      value={{
        addNewEvent,
        getAllEvents,
        allEvents,
        getEventInfo,
        clickedEvent
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
}
