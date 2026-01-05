const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  resumeText: String,
  jdText: String,
  skillMatch: Number
});

module.exports = mongoose.model("Candidate", candidateSchema);
