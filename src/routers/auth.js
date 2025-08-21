import express from 'express';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema,loginUserSchema } from "../validation/auth.js";
import { registerUserController,loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from "../middlewares/validateBody.js";

const router = express.Router();


router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);


router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);




router.post('/logout', authenticate, ctrlWrapper(logoutUserController));



export default router;
