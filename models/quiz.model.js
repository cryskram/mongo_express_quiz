const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    question: { type: String },
    options: [String],
    correct: { type: String },
    tags: [String],
    difficulty: { type: String },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
