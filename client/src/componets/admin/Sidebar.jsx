import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
     ${isActive ? "bg-primary/10 border-r-4 border-primary" : ""}`;

  return (
    <div>
      <NavLink end to="/admin" className={linkClasses}>
        <img src={assets.home_icon} alt="Dashboard" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink to="/admin/add-blog" className={linkClasses}>
        <img src={assets.add_icon} alt="Add Blogs" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink to="/admin/list-blog" className={linkClasses}>
        <img src={assets.list_icon} alt="List Blogs" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">List Blogs</p>
      </NavLink>

      <NavLink to="/admin/comments" className={linkClasses}>
        <img src={assets.comment_icon} alt="Comments" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
