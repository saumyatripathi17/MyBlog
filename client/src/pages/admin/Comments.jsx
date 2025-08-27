import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../componets/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/comments');
      setLoading(false);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter(
    (comment) => comment.isApproved === (filter === 'Approved')
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex items-center justify-between max-w-3xl">
        <h1 className="text-xl font-semibold">Comments</h1>
        <div className="flex gap-4">
          {['Approved', 'Not Approved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
                filter === status ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[80vh] max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading comments...</p>
          </div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase text-left">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Blog Title & Comments
                </th>
                <th scope="col" className="px-6 py-3 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.length > 0 ? (
                filteredComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No comments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Comments;
