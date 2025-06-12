import express from 'express';
import { login, logout, signup, updateProfile, checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.put("/update-profile", protectRoute, updateProfile);
//protectRoute is a middleware which checks if user is authenticated before he updates his profile.
// if protectRoute returns true, the control will be passed on to updateProfile function.

router.get("/check",protectRoute,checkAuth);

export default router;