import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../componets/admin/BlogTableItem';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className='flex-1 pt-6 px-5 sm:pt-14 sm:pl-16'>
        
        {/* Page Title */}
        <h1 className='mb-8 text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2'>
          <span className="text-blue-600">📚</span> All Blogs
        </h1>
        
        {/* Table Wrapper */}
        <div className='relative h-4/5 max-w-5xl overflow-x-auto rounded-2xl shadow-xl scrollbar-hide bg-white border border-gray-200'>
          <table className='w-full text-sm text-gray-700'>
            
            {/* Table Head */}
            <thead className='text-xs uppercase bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 font-semibold'>
              <tr>
                <th scope='col' className='px-4 py-4 text-left'>#</th>
                <th scope='col' className='px-4 py-4 text-left'>Blog Title</th>
                <th scope='col' className='px-4 py-4 max-sm:hidden text-left'>Date</th>
                <th scope='col' className='px-4 py-4 max-sm:hidden text-left'>Status</th>
                <th scope='col' className='px-4 py-4 text-center'>Action</th>
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
