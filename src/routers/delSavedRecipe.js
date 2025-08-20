import Router from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { delSavedRecipeController } from '../controllers/delSavedRecipeController.js';

const router = Router();

router.delete(
  '/saved-recipes/:recipeId',
  protect,
  ctrlWrapper(delSavedRecipeController),
);

export default router;
