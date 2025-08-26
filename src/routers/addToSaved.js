import Router from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { postSavedRecipesController } from '../controllers/postSavedRecipesController.js';

const router = Router();

router.post(
  '/saved',
  authenticate,
  ctrlWrapper(postSavedRecipesController),
);

export default router;
