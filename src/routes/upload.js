import { parsePDF } from '../services/parser.js';

export async function uploadRoutes(app) {
  app.post('/upload', async (req, reply) => {
    const data = await req.file();
    const buffer = await data.toBuffer();
    const text = await parsePDF(buffer);
    return { text };
  });
}
