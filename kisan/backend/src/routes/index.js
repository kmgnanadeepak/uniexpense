import { Router } from 'express';
import diseaseRouter from './modules/diseaseRoutes.js';
import prescriptionRouter from './modules/prescriptionRoutes.js';
import shopRouter from './modules/shopRoutes.js';
import authRouter from './modules/authRoutes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/disease', diseaseRouter);
router.use('/prescription', prescriptionRouter);
router.use('/shops', shopRouter);

export default router;

