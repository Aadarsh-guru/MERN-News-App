import { Router } from "express";
import { requireSignIn } from '../middlewares/authMiddleware.js'
import { userProfileController, userUpdateController, deleteUserController } from '../controller/userController.js'
import { upload } from "../helpers/gridFsStrorageConfig.js";
const router = Router();

router.get('/user-profile/:filename', userProfileController)

router.put('/update', requireSignIn, upload.single('profile'), userUpdateController)

router.post('/delete-user', requireSignIn, deleteUserController)

export default router;