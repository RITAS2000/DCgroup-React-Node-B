import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { recipeSchema } from '../validation/addRecipe.js';
import {
  upload,
  uploadErrorHandler,
} from '../middlewares/upload.middleware.js';
import { createRecipe } from '../controllers/addRecipe.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  upload.single('thumb'),
  uploadErrorHandler,
  validateBody(recipeSchema),
  ctrlWrapper(createRecipe),
);

export default router;
