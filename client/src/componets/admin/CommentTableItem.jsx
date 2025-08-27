import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  // Approve Comment
  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve comment");
    }
  };

  // Delete Comment (fixed)
  const deleteComment = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
      if (!confirmDelete) return;

      const { data } = await axios.delete('/api/admin/delete-comment', {
        data: { id: _id }   // ✅ fixed key
      });

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blogs</b>: {blog?.title || 'Blog Deleted'}
        <br /><br />
        <b className='font-medium text-gray-600'>Name</b>: {name}
        <br />
        <b className='font-medium text-gray-600'>Comments</b>: {content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className='w-5 hover:scale-110 transition-all cursor-pointer'
              alt="approve"
            />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="delete"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
          />
        </div>
      </td>
    </tr>
  )
};

export default CommentTableItem;
