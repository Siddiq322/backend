import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../src/routes/authRoutes.js';
import accountRoutes from '../src/routes/accountRoutes.js';
import transactionRoutes from '../src/routes/transactionRoutes.js';
import adminRoutes from '../src/routes/adminRoutes.js';
import { errorHandler } from '../src/middleware/errorHandler.js';
import { resetMockData } from '../src/mock/mockData.js';

const app = express();

// Initialize mock data once
resetMockData();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => 
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(), 
    timestamp: Date.now() 
  })
);

app.get('/api/metrics', (_req, res) => 
  res.json({ 
    transactionsProcessed: 0, 
    eventsEmitted: 0, 
    currentMemoryUsage: process.memoryUsage().rss 
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use(errorHandler);

// Export for Vercel
export default app;
