import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllRegistrations } from '../controllers/reg.controller.js';
const router = express.Router();

router.get('/registrations',protectRoute,getAllRegistrations);

export default router;