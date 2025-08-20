import Router from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getSavedRecipesController } from '../controllers/getSavedRecipesController.js';

const router = Router();

router.get('/saved-recipes', protect, ctrlWrapper(getSavedRecipesController));

export default router;
