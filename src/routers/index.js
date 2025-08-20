import { Router } from 'express';

import authRouter from './auth.js';
import ByIdrecipesRouter from './getRecipeById.routes.js'; // працюе

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', ByIdrecipesRouter); // працюе

export default router;
