import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import BlogCard from '../components/blog/BlogCard';
import { getBlogPosts } from '../data/mockData';

const BlogPage: React.FC = () => {
  const allPosts = getBlogPosts();
  const [posts, setPosts] = useState(allPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(allPosts.map(post => post.category)));
  
  // Filter posts based on search and category
  const filterPosts = () => {
    let filtered = allPosts;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setPosts(filtered);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterPosts();
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };
  
  React.useEffect(() => {
    filterPosts();
  }, [selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore articles on web development, programming, and technology
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Search Bar */}
          <div className="md:w-2/3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <button type="submit" className="sr-only">Search</button>
            </form>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-1/3">
            <select 
              value={selectedCategory || ''}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage;