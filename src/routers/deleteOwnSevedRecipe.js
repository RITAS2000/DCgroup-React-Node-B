import express from 'express';
import { deleteOwnRecipeController } from '../controllers/deleteOwnRecipeController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.delete(
  '/own/:recipeId',
  authenticate,
  ctrlWrapper(deleteOwnRecipeController),
);

export default router;
