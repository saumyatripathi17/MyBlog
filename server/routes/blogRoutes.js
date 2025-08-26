import express from "express";
import { 
  addBlog, 
  addComment, 
  deleteBlogById, 
  getAllBlogs, 
  getBlogComments, 
  getBlogId, 
  togglePublish ,
  generateContent
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

// Blogs
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getBlogId);
blogRouter.delete("/:blogId", auth, deleteBlogById);
blogRouter.patch("/:blogId/publish", auth, togglePublish);

// Comments
blogRouter.post("/:blogId/comment", addComment);
blogRouter.get("/:blogId/comment", getBlogComments);

blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
