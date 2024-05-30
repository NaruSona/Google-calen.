// routes/googleAuthRoutes.js
const express = require("express");
const router = express.Router();
const googleAuthController = require("../controllers/googleAuthController");

router.get("/auth/google", googleAuthController.getAuthUrl);
router.get("/auth/google/callback", googleAuthController.googleAuthCallback);
router.post("/google/events", googleAuthController.createGoogleEvent);

module.exports = router;
