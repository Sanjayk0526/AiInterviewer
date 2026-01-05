exports.generateQuestions = () => [
  "Explain your technical background.",
  "Describe a challenging project.",
  "How do you handle deadlines?",
  "What tools are you proficient in?",
  "Why should we hire you?"
];

exports.evaluateAnswers = () => ({
  technical: 8,
  communication: 7,
  relevance: 8,
  recommendation: "Selected"
});
