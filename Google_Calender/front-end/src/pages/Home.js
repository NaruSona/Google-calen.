import React, { useState } from "react";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";

const Home = () => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const handleOpenEventForm = () => {
    console.log("Opening Event Form");
    setIsEventFormOpen(true);
  };

  const handleCloseEventForm = () => {
    console.log("Closing Event Form");
    setIsEventFormOpen(false);
  };

  return (
    <div>
      <h1>Tutor Calendar</h1>
      <button onClick={handleOpenEventForm}>Add Event</button>
      <Calendar />
      {isEventFormOpen && <EventForm onClose={handleCloseEventForm} />}
    </div>
  );
};

export default Home;
