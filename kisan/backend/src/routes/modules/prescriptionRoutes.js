import { Router } from 'express';
import { generatePrescriptionController } from '../../controllers/prescriptionController.js';

const router = Router();

router.post('/generate', generatePrescriptionController);

export default router;

