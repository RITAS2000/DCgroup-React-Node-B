import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUserController } from "../controllers/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));

export default router;