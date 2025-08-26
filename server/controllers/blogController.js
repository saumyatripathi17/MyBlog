import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js'; // <-- Added import

// Add a new blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [{ quality: 'auto' }, { format: 'webp' }, { width: '1280' }],
    });

    const image = optimizedImageUrl;

    await Blog.create({ title, subTitle, description, category, image, isPublished });

    res.json({ success: true, message: 'Blog added successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all published blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get single blog by ID
export const getBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.json({ success: false, message: 'Blog Not Found' });

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete blog by ID
export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    await Blog.findByIdAndDelete(blogId);

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: blogId });

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle blog publish status
export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.json({ success: false, message: 'Blog Not Found' });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: 'Blog status updated successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add comment to a blog
export const addComment = async (req, res) => {
  try {
    const { name, content } = req.body;
    const blogId = req.params.blogId;

    if (!name || !content) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and content are required' });
    }

    await Comment.create({ blog: blogId, name, content, isApproved: false });

    res.json({ success: true, message: 'Comment added for review' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get approved comments for a blog
export const getBlogComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({
      createdAt: -1,
    });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
