import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import { stripeWebhook } from './controllers/stripeWebhook.js';

const app = express();

const trustedOrigins = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://client-seven-sand-20.vercel.app',
      'https://aisitebuilder.site',
      'https://www.aisitebuilder.site',
      'https://ai-site-builder-r1a4.onrender.com',
    ];

const corsOptions = {
  origin: trustedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.post(
  '/api/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.all('/api/auth/*', toNodeHandler(auth));

app.use(express.json({ limit: '50mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Live!');
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

export default app;