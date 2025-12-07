import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/otp-request', authController.otpRequest);
router.post('/verify-otp', authController.verifyOtp);

export default router;
