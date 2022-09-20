import { Router } from "express";
import UserController from "../controllers/UserController.js";
import commonMiddleware from "../middlewares/CommonMiddleware.js";

const router = Router();
const userController = new UserController();

/* GET users listing. */
router.get('/user', userController.getAll);

/* GET view single user. */
router.get('/user/:id', userController.getById);

/* GET receive user avatar. */
router.get('/user/avatar/:avatar', userController.getUserAvatar);

/* POST create a new user. */
router.post('/user', userController.createUser);

/* POST upload avatar. */
router.post('/user/:id/upload-avatar', userController.uploadAvatar);

/* POST delete user. */
router.post('/user/:id/delete', userController.remove);

export default router;
