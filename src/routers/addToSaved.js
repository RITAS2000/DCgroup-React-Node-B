import Router from 'express';

import { protect } from '../middlewares/auth.middleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { postSavedRecipesController } from '../controllers/postSavedRecipesController.js';

const router = Router();

router.post('/saved-recipes', protect, ctrlWrapper(postSavedRecipesController));

export default router;
