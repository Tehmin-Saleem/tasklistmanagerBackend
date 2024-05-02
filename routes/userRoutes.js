const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const auth = require("../middleware/auth.middleware.js");

// Get all users
router.post("/login", userController.loginUser);
router.post("/", userController.createUser);

router.use(auth);

router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Create a new user

// Update a user by ID
router.patch("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
