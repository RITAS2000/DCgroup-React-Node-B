import Router from 'express';

// import { protect } from '../middlewares/auth.middleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getSavedRecipesController } from '../controllers/getSavedRecipesController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/saved', authenticate, ctrlWrapper(getSavedRecipesController));

export default router;
