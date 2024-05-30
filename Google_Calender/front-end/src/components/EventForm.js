import React, { useState } from "react";
import axios from "axios";

const EventForm = ({ onClose, refreshEvents }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      participants: participants
        .split(",")
        .map((participant) => participant.trim()),
      date,
      time,
      duration,
      sessionNotes,
    };

    try {
      await axios.post("/api/events", newEvent);
      refreshEvents();
      onClose();
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Participants"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration (hrs)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <textarea
        placeholder="Session Notes"
        value={sessionNotes}
        onChange={(e) => setSessionNotes(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Event</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EventForm;
