import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = Router();

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/users', adminController.listUsers);
router.post('/users/:userId/impersonate', adminController.impersonate);
router.post('/system/reseed', adminController.reseed);
router.get('/system/health', adminController.systemHealth);
router.get('/transactions/monitor', adminController.monitorTransactions);
router.post('/export', adminController.exportUsers);
router.get('/accounts', adminController.accountsSummary);

export default router;
