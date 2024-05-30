import axios from "axios";

const API_URL = "http://localhost:5000"; // backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const fetchEvents = () => api.get("/api/events");
export const createEvent = (eventData) => api.post("/api/events", eventData);
export const updateEvent = (eventId, eventData) =>
  api.put(`/api/events/${eventId}`, eventData);
export const deleteEvent = (eventId) => api.delete(`/api/events/${eventId}`);

export default api;
