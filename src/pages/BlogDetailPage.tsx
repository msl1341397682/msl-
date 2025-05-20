import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogDetail from '../components/blog/BlogDetail';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { BlogPost, Comment } from '../types';
import { getBlogPost, getPostComments } from '../data/mockData';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const fetchedPost = getBlogPost(id);
      const fetchedComments = getPostComments(id);
      
      setIsLoading(false);
      
      if (fetchedPost) {
        setPost(fetchedPost);
        setComments(fetchedComments);
        
        // Check if the current user is the author of the post
        if (isAuthenticated && user && fetchedPost.author.id === user.id) {
          setIsOwner(true);
        }
      } else {
        // Post not found, redirect to blog listing
        navigate('/blog');
      }
    }
  }, [id, isAuthenticated, user, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you're looking for might have been removed or doesn't exist.
          </p>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {isOwner && (
        <div className="flex justify-end mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/dashboard/edit/${post.id}`)}
          >
            Edit Post
          </Button>
        </div>
      )}
      <BlogDetail post={post} comments={comments} />
    </Layout>
  );
};

export default BlogDetailPage;