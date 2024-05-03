// userController.js
const { User, UserLogin, UserSignUp } = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by name
exports.getUserByName = async (req, res) => {
  const { customerName } = req.params;
  try {
    const user = await User.findOne({ customerName });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  const { customerName, projectName, startDate, endDate, overdueDays } = req.body;

  try {
    const user = new User({
      customerName,
      projectName,
      startDate,
      endDate,
      overdueDays,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Create a new user
exports.createUser = async (req, res) => {
  const { customerName, projectName, startDate, endDate, overdueDays } = req.body;

  try {
    const user = new User({
      customerName,
      projectName,
      startDate,
      endDate,
      overdueDays,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, generate JWT token
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "your-secret-key-youcanothackme2232323@*#*###",
        {
          expiresIn: "1h",
        }
      );
      return res.json({ token });
    } else {
      // If passwords don't match, return 401 Unauthorized
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      // user.username = req.body.username || user.username;
      // user.email = req.body.email || user.email;
      user.customerName = req.body.customerName || user.customerName;
      user.projectName = req.body.projectName || user.projectName;
      user.startDate = req.body.startDate || user.startDate;
      user.endDate = req.body.endDate || user.endDate;
      user.overdueDays = req.body.overdueDays || user.overdueDays;
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      // Update other user properties here

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
