import { Router } from 'express';

import authRouter from './auth.js';

import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';
import ByIdrecipesRouter from './getRecipeById.routes.js'; // працюе
import sevedRouter from './addToSaved.js';
import addRecipeRouter from './addRecipe.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);

router.use('/recipes', sevedRouter);
router.use('/recipes', addRecipeRouter);
router.use('/recipes', ByIdrecipesRouter); // працюе

export default router;
