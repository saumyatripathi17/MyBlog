import express from 'express';
import { adminLogin, approveCommentById, getAllComments, deleteCommentById, getAllBlogsAdmin, getDashboard, togglePublishById } from '../controllers/adminController.js';
import auth from '../middlewares/auth.js';
import { deleteBlogById } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.delete('/delete-comment', auth, deleteCommentById);
adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.get('/dashboard', auth, getDashboard);
adminRouter.post('/toggle-publish', auth, togglePublishById);
adminRouter.post('/delete-blog', auth, deleteBlogById);

export default adminRouter;
