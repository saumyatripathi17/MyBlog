import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, isPublished } = blog;
    const BlogDate = new Date(createdAt);
    const { axios } = useAppContext();

    const deleteBlog = async () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
      if (!confirmDelete) return;
      try {
        const { data } = await axios.post('/api/blog/delete', { id: blog._id });
        if (data.success) {
          toast.success(data.message);
          fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const togglePublish = async () => {
      try {
        const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
        if (data.success) {
          toast.success(data.message);
          fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    return (
      <tr className='hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100'>
        <th className='px-6 py-4'>{index}</th>
        <td className='px-6 py-4'>{title}</td>
        <td className='px-6 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
        <td className='px-6 py-4 max-sm:hidden'>
          <span className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
            {isPublished ? 'Published' : 'Unpublished'}
          </span>
        </td>
        <td className='px-6 py-4 flex gap-3 justify-center'>
          <button onClick={togglePublish} className='border px-3 py-1 rounded hover:bg-gray-100 transition-all'>
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <img onClick={deleteBlog} src={assets.cross_icon} className='w-6 h-6 hover:scale-110 transition-transform cursor-pointer' alt="delete" />
        </td>
      </tr>
    )
}

export default BlogTableItem;
