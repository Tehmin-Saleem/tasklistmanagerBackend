const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  customerName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  overdueDays: {
    type: Number,
    required: true,
  },
  // Other user properties
});

module.exports = mongoose.model("User", userSchema);
