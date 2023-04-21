const mongoose = require("mongoose");

// Define the quiz schema
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  rightAnswer: {
    type: Number,
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
  status: {
    type: String,
    enum: ["inactive", "active", "finished"],
    default: "inactive",
  },
});

// Define the quiz model
module.exports = mongoose.model("Quiz", quizSchema);
