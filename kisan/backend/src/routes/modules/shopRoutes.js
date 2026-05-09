import { Router } from 'express';
import { getNearbyShopsController } from '../../controllers/shopController.js';

const router = Router();

router.get('/nearby', getNearbyShopsController);

export default router;

