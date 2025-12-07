import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { PORT, MONGO_URI, IS_MOCK } from './config';
import { connectMongo } from './config/mongoPlaceholder';
import authRoutes from './routes/authRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';
import { attachWs } from './ws';
import { resetMockData } from './mock/mockData';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() }));
app.get('/api/metrics', (_req, res) => res.json({ transactionsProcessed: 0, eventsEmitted: 0, currentMemoryUsage: process.memoryUsage().rss }));

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

// Initialize database connection for serverless
if (!IS_MOCK && MONGO_URI) {
  connectMongo(MONGO_URI).catch(console.error);
} else {
  resetMockData();
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  (async () => {
    if (!IS_MOCK) {
      await connectMongo(MONGO_URI);
      console.log('Connected to Mongo');
    } else {
      resetMockData();
      console.log('Running in mock mode');
    }
    attachWs(app, PORT);
  })();
}

// Export for Vercel serverless
export default app;
