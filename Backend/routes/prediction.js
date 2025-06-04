const express = require("express");
const router = express.Router();
const { getPrediction } = require("../utils/modelCaller");

// POST /api/predict
router.post("/", async (req, res) => {
  const { symptomText } = req.body;

  if (!symptomText) {
    return res.status(400).json({ error: "Symptom text is required" });
  }

  try {
    const result = await getPrediction(symptomText);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Model prediction failed" });
  }
});

module.exports = router;
