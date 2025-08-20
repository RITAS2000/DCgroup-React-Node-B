import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getOwnRecipes } from '../controllers/get-recipesController.js';

const router = Router();

router.get('/', auth, getOwnRecipes);

export default router;
