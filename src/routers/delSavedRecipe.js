import Router from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { delSavedRecipeController } from '../controllers/delSavedRecipeController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.delete(
  '/saved-recipes/:recipeId',
  authenticate,
  ctrlWrapper(delSavedRecipeController),
);

export default router;
