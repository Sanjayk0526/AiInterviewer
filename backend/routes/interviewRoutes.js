const express = require("express");
const Interview = require("../models/Interview");
const { generateQuestions, evaluateAnswers } = require("../utils/aiService");

const router = express.Router();

router.post("/generate-questions", async (req, res) => {
  const questions = generateQuestions();
  const interview = await Interview.create({
    candidateId: req.body.candidateId,
    questions,
    answers: []
  });
  res.json(interview);
});

router.post("/submit-answer", async (req, res) => {
  const interview = await Interview.findByIdAndUpdate(
    req.body.interviewId,
    { answers: req.body.answers },
    { new: true }
  );
  res.json(interview);
});

router.post("/evaluate-answer", async (req, res) => {
  const scores = evaluateAnswers();
  const interview = await Interview.findByIdAndUpdate(
    req.body.interviewId,
    scores,
    { new: true }
  );
  res.json(interview);
});

router.get("/get-results/:id", async (req, res) => {
  const interview = await Interview.findById(req.params.id);
  res.json(interview);
});

module.exports = router;
