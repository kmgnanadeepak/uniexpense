import { Router } from 'express';
import { getMe, bootstrapProfile } from '../../controllers/authController.js';

const router = Router();

router.get('/me', getMe);
router.post('/bootstrap', bootstrapProfile);

export default router;

