const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a single task by title
router.get("/:title", taskController.getTaskByTitle);

// Create a new task
router.post("/", taskController.createTask);

// Update a task by title
router.patch("/:title", taskController.updateTaskByTitle);

// Delete a task by title
router.delete("/:title", taskController.deleteTaskByTitle);

module.exports = router;
