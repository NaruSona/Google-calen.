import React, { useState } from "react";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import axios from "axios";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const refreshEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events"); // Replace URL with your backend API URL
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>Create Event</button>
      <Calendar />
      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          refreshEvents={refreshEvents}
        />
      )}
    </div>
  );
}

export default App;
