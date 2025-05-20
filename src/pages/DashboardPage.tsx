import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { BlogPost } from '../types';
import { getBlogPosts } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated

    //暂时放开登录
    // if (!isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }
    
    // Fetch user's posts
    const fetchPosts = () => {
      // In a real app, this would be an API call filtered by the user's ID
      const allPosts = getBlogPosts();
      const userPosts = user ? allPosts.filter(post => post.author.id === user.id) : [];
      setPosts(userPosts);
      setIsLoading(false);
    };
    
    fetchPosts();
  }, [isAuthenticated, user, navigate]);
  
  const handleDeletePost = (postId: string) => {
    // In a real app, this would make an API call to delete the post
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <Link to="/dashboard/new">
            <Button>
              <Plus size={18} className="mr-1" /> New Post
            </Button>
          </Link>
        </div>
        
        {user && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center">
                <img 
                  src={user.avatar || 'https://via.placeholder.com/60'} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Posts</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Posts</h2>
          </div>
          
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                  <tr>
                    <th className="px-6 py-3 text-gray-600 dark:text-gray-300 text-sm font-medium">Title</th>
                    <th className="px-6 py-3 text-gray-600 dark:text-gray-300 text-sm font-medium">Date</th>
                    <th className="px-6 py-3 text-gray-600 dark:text-gray-300 text-sm font-medium">Status</th>
                    <th className="px-6 py-3 text-gray-600 dark:text-gray-300 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{post.excerpt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          {post.publishedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.isPublished 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link to={`/blog/${post.id}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <Eye size={18} />
                          </Link>
                          <Link to={`/dashboard/edit/${post.id}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't created any posts yet.</p>
              <Link to="/dashboard/new">
                <Button>
                  <Plus size={18} className="mr-1" /> Create Your First Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;