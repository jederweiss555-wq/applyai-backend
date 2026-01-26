import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { config } from './config.js';
import { uploadRoutes } from './routes/upload.js';
import { generateRoutes } from './routes/generate.js';

const app = Fastify();

await app.register(cors);
await app.register(multipart);

await uploadRoutes(app);
await generateRoutes(app);

app.get('/', async () => {
  return { status: 'ApplyAI Backend running 🚀' };
});

app.listen({ port: config.PORT, host: '0.0.0.0' });
