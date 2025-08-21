import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getOwnRecipes } from '../controllers/get-recipesController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/own', authenticate, ctrlWrapper(getOwnRecipes));

export default router;
