import { Router } from 'express';
import * as accountController from '../controllers/accountController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, accountController.list);
router.post('/', authMiddleware, accountController.create);
router.get('/:accountId', authMiddleware, accountController.getOne);

export default router;
