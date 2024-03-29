import dotenv from "dotenv";
import openaiPackage from "openai";

dotenv.config();

const configuration = new openaiPackage.Configuration({
  apiKey: process.env.OPENAI_API_KEY, {'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'} 
});

const openai = new openaiPackage.OpenAIApi(configuration);

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`Received chat message: ${message}`);
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Consider updating the model if a newer version is available
      prompt: message,
      temperature: 0.5,
      max_tokens: 150,
    });

    console.log(`OpenAI response: ${response.data.choices[0].text.trim()}`);
    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error in chatWithBot: ", error.message, error.stack, error);
    res.status(500).json({ message: "Failed to communicate with chatbot", error: error.message });
  }
};