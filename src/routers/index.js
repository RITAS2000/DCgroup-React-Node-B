import { Router } from 'express';

import authRouter from './auth.js';

import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';
import ByIdrecipesRouter from './getRecipeById.routes.js'; // працюе
import sevedRouter from './addToSaved.js';
import addRecipeRouter from './addRecipe.js';
import delSavedRecipe from './delSavedRecipe.js';
import recipesOwnRouter from './recipes.js';

import searchRecipesRouter from './searchRecipes.js';

import getSavedRouter from './getSavedRecipes.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);

router.use('/recipes', recipesOwnRouter);
router.use('/recipes', addRecipeRouter);
router.use('/recipes', delSavedRecipe);
router.use('/recipes', sevedRouter);

router.use('/recipes', searchRecipesRouter);

router.use('/recipes', getSavedRouter);

router.use('/recipes', ByIdrecipesRouter); // працюе

export default router;
