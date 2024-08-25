import { GoogleGenerativeAI } from '@google/generative-ai';

// Get your API key from https://makersuite.google.com/app/apikey
// Access your API key as an environment variable
export const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

export default genAI;
