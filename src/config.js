import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3001,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  LLM_API_KEY: process.env.LLM_API_KEY,
  LLM_ENDPOINT: 'https://openrouter.ai/api/v1/chat/completions'
};
