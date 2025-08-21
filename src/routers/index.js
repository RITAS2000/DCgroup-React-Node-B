import { Router } from 'express';

import authRouter from './auth.js';

import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients';
import ByIdrecipesRouter from './getRecipeById.routes.js'; // працюе
import sevedRouter from './addToSaved.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);

router.use('/recipes', ByIdrecipesRouter); // працюе
router.use('/recipes', sevedRouter);

export default router;
