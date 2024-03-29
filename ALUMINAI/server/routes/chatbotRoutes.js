import express from 'express';
import { chatWithBot } from '../controllers/chatbotController.js';
const router = express.Router();

router.post('/chat', chatWithBot);

// Log for confirming route registration
console.log("Chatbot routes registered successfully.");

export default router;