import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../componets/admin/BlogTableItem';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const {axios}=useAppContext()

  const fetchBlogs = async () => {
    try{
      const {data}=await axios.get('/api/admin/blogs');
      if(data.success){
        setBlogs(data.blogs);
      }else{
        toast.error(data.message);
      }
    }catch(error){
     toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center gap-x-56">
  <div className='w-full max-w-5xl pt-6 px-5 sm:pt-14'>
    
    {/* Page Title */}
    <h1 className='mb-8 text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2 justify-center'>
      <span className="text-blue-600">📚</span> All Blogs
    </h1>
    
    {/* Table Wrapper */}
    <div className='relative w-full h-[80vh] overflow-auto rounded-3xl shadow-lg scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 border border-gray-200 bg-white'>
      <table className='w-full text-sm text-gray-700'>
        
        {/* Table Head */}
        <thead className='text-xs uppercase bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800 font-semibold sticky top-0 z-10'>
          <tr>
            <th scope='col' className='px-6 py-4 text-left'>#</th>
            <th scope='col' className='px-6 py-4 text-left'>Blog Title</th>
            <th scope='col' className='px-6 py-4 max-sm:hidden text-left'>Date</th>
            <th scope='col' className='px-6 py-4 max-sm:hidden text-left'>Status</th>
            <th scope='col' className='px-6 py-4 text-center'>Action</th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className='divide-y divide-gray-100'>
          {blogs.map((blog, index) => (
            <BlogTableItem 
              key={blog._id} 
              blog={blog} 
              fetchBlogs={fetchBlogs} 
              index={index + 1} 
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


  )
}

export default ListBlog
