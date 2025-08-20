import express from 'express';
import {
  createRecipe,
  getRecipeByIdController,
} from '../controllers/add-recipe.controller.js';
import {
  upload,
  uploadErrorHandler,
} from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.post(
  '/',
  protect,
  upload.single('photo'),
  uploadErrorHandler,
  createRecipe,
);

//публічний ендпоінт для отримання детальної інформації про рецепт за його id
router.get('/recipes/:recipesId', isValidId, getRecipeByIdController);

export default router;
