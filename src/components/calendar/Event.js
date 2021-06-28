import React from "react";

export function Event(e) {

  return (
    <>
      <div id={e.id} key={e.id}>
        <p>{e.title}</p>
        <p>{e.description}</p>
        <p>{e.start}</p>
      </div>
    </>
  );
}
