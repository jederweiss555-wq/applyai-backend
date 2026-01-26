import fetch from 'node-fetch';
import { config } from '../config.js';

export async function callLLM(prompt) {
  const res = await fetch(config.LLM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.LLM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Du bist ein professioneller HR-Recruiter.' },
        { role: 'user', content: prompt }
      ]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
