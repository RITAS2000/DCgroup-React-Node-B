import express from 'express';
import { createRecipe } from '../controllers/add-recipe.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createRecipe);

export default router;
