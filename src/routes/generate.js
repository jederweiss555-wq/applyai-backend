import { callLLM } from '../services/llm.js';
import { buildPrompt } from '../services/prompt.js';

export async function generateRoutes(app) {
  app.post('/generate', async (req, reply) => {
    const { cv, job } = req.body;
    const prompt = buildPrompt(cv, job);
    const result = await callLLM(prompt);
    return { result };
  });
}
