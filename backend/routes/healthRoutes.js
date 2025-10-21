import express from 'express';
import { analyzeHealth, getLatestHealthData, getHealthHistory } from '../controllers/healthController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', auth, analyzeHealth);
router.get('/latest', auth, getLatestHealthData);
router.get('/history', auth, getHealthHistory);

export default router;
