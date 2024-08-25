import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import env from '@/constant/server';

// Initialize the Google Generative AI model
const model = new ChatGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
  model: 'gemini-pro',
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});

export default model;
