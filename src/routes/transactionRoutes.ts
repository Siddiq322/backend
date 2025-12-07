import { Router } from 'express';
import * as transactionController from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/transfer', authMiddleware, transactionController.transfer);
router.get('/history', authMiddleware, transactionController.history);

export default router;
