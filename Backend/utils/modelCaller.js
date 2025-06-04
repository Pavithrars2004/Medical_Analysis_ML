const axios = require("axios");

const getPrediction = async (symptomText) => {
  try {
    const response = await axios.post("http://localhost:5000/predict", {
      symptom_text: symptomText,
    });
    return response.data;
  } catch (error) {
    console.error("Prediction error:", error.message);
    throw error;
  }
};

module.exports = { getPrediction };
