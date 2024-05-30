// controllers/googleAuthController.js
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv");
const Event = require("../models/Event");

dotenv.config();

const oauth2Client = new OAuth2();
process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL;

exports.getAuthUrl = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.status(200).json({ url });
};

exports.googleAuthCallback = async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Save tokens to the database or session
  res.status(200).json({ tokens });
};

exports.createGoogleEvent = async (req, res) => {
  oauth2Client.setCredentials(req.body.tokens);

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = {
    summary: req.body.title,
    description: req.body.description,
    start: {
      dateTime: req.body.start,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: req.body.end,
      timeZone: "America/Los_Angeles",
    },
    attendees: req.body.participants.map((email) => ({ email })),
  };

  try {
    const googleEvent = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    // Save the event to MongoDB with the Google event ID
    const newEvent = new Event({
      ...req.body,
      googleEventId: googleEvent.data.id,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
