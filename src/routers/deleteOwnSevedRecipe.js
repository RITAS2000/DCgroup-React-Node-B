import express from 'express';
import { deleteOwnRecipeController } from '../controllers/deleteOwnRecipeController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.delete('/own/:recipeId', authenticate, deleteOwnRecipeController);

export default router;
