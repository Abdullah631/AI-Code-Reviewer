const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  
  if (!code) {
    return res.status(400).json({ 
      error: "Prompt is required",
      example: "http://localhost:5000/ai/get-response?prompt=Your question here"
    });
  }

  try {
    const response = await generateContent(code);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ 
      error: "Failed to generate response",
      details: error.message
    });
  }
};