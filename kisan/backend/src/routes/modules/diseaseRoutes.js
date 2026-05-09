import { Router } from 'express';
import multer from 'multer';
import { detectDiseaseController } from '../../controllers/diseaseController.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/detect', upload.single('image'), detectDiseaseController);

export default router;

