import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      {post.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            <span>{post.author.name}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap items-center mt-4 mb-2">
          <Tag size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link 
                key={index} 
                to={`/tags/${tag.toLowerCase()}`}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        
        <Link 
          to={`/blog/${post.id}`}
          className="inline-block mt-4 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;