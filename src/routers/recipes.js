import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getOwnRecipes } from '../controllers/recipesController.js';

const router = Router();

router.get('/own', auth, getOwnRecipes);

export default router;
