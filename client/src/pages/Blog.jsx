import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../componets/Navbar';
import Footer from '../componets/Footer';
import Loader from '../componets/Loader';
import Moment from 'moment';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios: api } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch single blog data
  const fetchBlogData = async () => {
    try {
      const { data } = await api.get(`/api/blog/${id}`);
      if (data.success) setData(data.blog);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch comments for the blog
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const { data } = await api.get(`/api/blog/${id}/comment`);
      setLoadingComments(false);
      if (data.success) setComments(data.comments);
      else toast.error(data.message);
    } catch (error) {
      setLoadingComments(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Add a new comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/blog/${id}/comment`, {
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) return <Loader />;

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-0 z-[-1] opacity-50"
      />
      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Saumya Tripathi
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comment Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4 bg-primary/20 w-30 rounded-2xl text-center">
            Comments ({comments.length})
          </p>

          {loadingComments ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-primary/20 border border-primary/5 p-4 rounded text-gray-600 max-w-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="" className="w-6" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col gap-4 items-start max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-48 resize-none"
            />
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className="max-w-3xl my-24 mx-auto">
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google+" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
