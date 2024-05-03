const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Get all notifications
router.get("/", notificationController.getAllNotifications);

// Get a single notification by user_id
router.get("/:user_id", notificationController.getNotificationByUserId);

// Create a new notification
router.post("/", notificationController.createNotification);

// Update a notification by user_id
router.patch("/:user_id", notificationController.updateNotificationByUserId);

// Delete a notification by user_id
router.delete("/:user_id", notificationController.deleteNotificationByUserId);

module.exports = router;
