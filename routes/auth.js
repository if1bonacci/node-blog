import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();
const authController = new AuthController();

/* GET register page. */
router.get('/register', authController.registerPage);

/* POST registration action */
router.post('/register', authController.register);

export default router;
