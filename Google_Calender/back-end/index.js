// index.js
const express = require("express");
const connectDB = require("./db");
const eventRoutes = require("./server/routes/events");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
