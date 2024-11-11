import React, { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventId, setEventId] = useState(null);
  console.log("eventId in context------------------>>", eventId);

  return (
    <EventContext.Provider value={{ eventId, setEventId }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
