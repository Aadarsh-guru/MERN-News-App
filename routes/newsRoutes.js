import { Router } from "express";
import { requireSignIn } from '../middlewares/authMiddleware.js'
import { createNewsController, getUserCategoryNews, getUserTypeNews, getNewsImage, getAllNewsByCategoryController, getAllNewsController, moveToBinController, deletePermanantlyController, publishNewsController, restoreNewsController, getSingleNewsController, updateNewsController } from '../controller/newsController.js'
import { upload } from '../helpers/gridFsStrorageConfig.js'
const router = Router();

router.post('/create', requireSignIn, upload.single('image'), createNewsController)

router.get('/user-type-news/:type/:page', requireSignIn, getUserTypeNews)

router.get('/user-category-news/:category/:page', requireSignIn, getUserCategoryNews)

router.get('/image/:filename', getNewsImage)

router.get('/get-news/:page', getAllNewsController)

router.get('/get-news/:category/:page', getAllNewsByCategoryController)

router.put('/move-to-bin/:id', requireSignIn, moveToBinController)

router.delete('/delete-permanantly/:id', requireSignIn, deletePermanantlyController)

router.put('/publish-news/:id', requireSignIn, publishNewsController)

router.put('/restore-news/:id', requireSignIn, restoreNewsController)

router.get('/get-single-news/:id', getSingleNewsController)

router.put('/update/:id', requireSignIn, upload.single('image'), updateNewsController)

export default router;