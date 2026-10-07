import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import { stripeWebhook } from './controllers/stripeWebhook.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
