import { Router } from 'express';

import authRouter from './auth.js';
import ByIdrecipesRouter from './getRecipeById.routes.js'; // працюе
import sevedRouter from './addToSaved.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/recipes', ByIdrecipesRouter); // працюе
router.use('/recipes', sevedRouter);

export default router;
