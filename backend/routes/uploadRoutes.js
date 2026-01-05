const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const Candidate = require("../models/Candidate");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  const data = await pdfParse(fs.readFileSync(req.file.path));
  const candidate = await Candidate.create({
    name: req.body.name,
    resumeText: data.text,
    skillMatch: Math.floor(Math.random() * 40) + 60
  });
  res.json(candidate);
});

router.post("/upload-jd", async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(
    req.body.candidateId,
    { jdText: req.body.jdText },
    { new: true }
  );
  res.json(candidate);
});

module.exports = router;
