import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { getOwnRecipes } from '../controllers/get-recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/own', auth, ctrlWrapper(getOwnRecipes));

export default router;
