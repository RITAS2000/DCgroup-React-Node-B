import { Router } from 'express';

import authRouter from './auth.js';
import savedRecipes from './addToSaved.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js'
import ingredientsRouter from './ingredients'

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', savedRecipes);
router.use('/users', usersRouter)
router.use('/categories', categoriesRouter)
router.use('/ingredients', ingredientsRouter)

export default router;
