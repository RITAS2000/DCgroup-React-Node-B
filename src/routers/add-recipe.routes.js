import express from 'express';
import { createRecipe } from '../controllers/add-recipe.controller.js';
import {
  upload,
  uploadErrorHandler,
} from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/',
  protect,
  upload.single('photo'),
  uploadErrorHandler,
  createRecipe,
);

export default router;
