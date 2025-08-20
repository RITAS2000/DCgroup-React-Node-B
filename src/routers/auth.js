import express from 'express';
import { logoutUserController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();




router.post('/logout', authenticate, logoutUserController);


export default router;
