import { Router } from 'express';

import authRouter from './auth.js';
import savedRecipes from './addToSaved.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', savedRecipes);

export default router;
