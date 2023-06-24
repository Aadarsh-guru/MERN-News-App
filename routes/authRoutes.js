import { Router } from "express";
import { userRegisterController, userLoginController } from '../controller/authController.js'
const router = Router();
import { upload } from "../helpers/gridFsStrorageConfig.js";

router.post('/register', upload.single('profile'), userRegisterController)

router.post('/login', userLoginController)

export default router;