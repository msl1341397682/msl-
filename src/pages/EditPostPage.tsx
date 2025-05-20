import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import MarkdownEditor from '../components/blog/MarkdownEditor';
import { useAuth } from '../context/AuthContext';
import { BlogPost } from '../types';
import { getBlogPost } from '../data/mockData';

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const isNewPost = id === 'new';
  
  useEffect(() => {
    // Check if user is authenticated
    // if (!isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }
    
    // For edit mode, fetch the post
    if (!isNewPost && id) {
      const post = getBlogPost(id);
      
      if (post) {
        // Check if the current user is the author
        if (user && post.author.id !== user.id) {
          navigate('/dashboard');
          return;
        }
        
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || '');
        setCategory(post.category);
        setTags(post.tags.join(', '));
        setIsPublished(post.isPublished);
      } else {
        navigate('/dashboard');
        return;
      }
    }
    
    setIsLoading(false);
  }, [id, isNewPost, isAuthenticated, user, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!title || !content || !category) {
      setError('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would make an API call to create/update the post
    // For demo purposes, we'll just redirect to the dashboard
    
    const updatedPost: Partial<BlogPost> = {
      title,
      content,
      excerpt: excerpt || title.substring(0, 120) + '...',
      coverImage,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      isPublished,
    };
    
    console.log('Saving post:', updatedPost);
    
    // Redirect to dashboard
    navigate('/dashboard');
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          {isNewPost ? 'Create New Post' : 'Edit Post'}
        </h1>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Post Details</h2>
            
            <Input
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <Input
              id="excerpt"
              label="Excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of your post (optional)"
            />
            
            <Input
              id="coverImage"
              label="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg (optional)"
            />
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select a category</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Career">Career</option>
              </select>
            </div>
            
            <Input
              id="tags"
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Separate tags with commas (React, JavaScript, etc.)"
            />
            
            <div className="flex items-center mt-4">
              <input
                id="published"
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Publish immediately
              </label>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Content</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Use Markdown to format your post. You can use headings, lists, code blocks, and more.
            </p>
            
            <MarkdownEditor value={content} onChange={(value) => setContent(value || '')} />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isNewPost ? 'Create Post' : 'Update Post'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPostPage;