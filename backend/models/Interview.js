const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidateId: mongoose.Schema.Types.ObjectId,
  questions: [String],
  answers: [String],
  scores: {
    technical: Number,
    communication: Number,
    relevance: Number
  },
  recommendation: String
});

module.exports = mongoose.model("Interview", interviewSchema);
