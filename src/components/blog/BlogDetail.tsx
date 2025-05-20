import React from 'react';
import { Calendar, User, Tag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost, Comment } from '../../types';
import Button from '../ui/Button';

interface BlogDetailProps {
  post: BlogPost;
  comments?: Comment[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, comments = [] }) => {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            <span>{post.author.name}</span>
          </div>
          
          <div className="flex items-center">
            <MessageCircle size={16} className="mr-1" />
            <span>{comments.length} comments</span>
          </div>
        </div>
        
        {post.coverImage && (
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </header>
      
      <div 
        className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-img:rounded-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
      />
      
      <div className="border-t border-b border-gray-200 dark:border-gray-800 py-6 mb-8">
        <div className="flex items-center mb-4">
          <Tag size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tags</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Link 
              key={index} 
              to={`/tags/${tag.toLowerCase()}`}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
          <Button variant="outline" size="sm">
            Add Comment
          </Button>
        </div>
        
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={comment.author.avatar || 'https://via.placeholder.com/40'} 
                    alt={comment.author.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </h4>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {comment.createdAt}
                    </time>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-6">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </section>
    </article>
  );
};

export default BlogDetail;