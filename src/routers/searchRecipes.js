import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { searchRecipesController } from '../controllers/searchRecipesController.js';

const router = Router();

router.get('/search', ctrlWrapper(searchRecipesController));

export default router;
