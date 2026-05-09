import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import './config/db.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import { firebaseAuthMiddleware } from './middleware/firebaseAuthMiddleware.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || '*',
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'kisan-setu-backend' });
});

app.use(firebaseAuthMiddleware);

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

