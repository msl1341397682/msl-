import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogCard from '../components/blog/BlogCard';
import Button from '../components/ui/Button';
import { getBlogPosts } from '../data/mockData';

const HomePage: React.FC = () => {
  const allPosts = getBlogPosts();
  const [visiblePosts] = useState(allPosts);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          欢迎来到我的个人博客
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          分享关于网络开发、编程和技术的想法、见解和知识的地方
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/blog">
            <Button size="lg">
              阅读博客
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              了解更多
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Featured Posts */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <Link to="/blog" className="flex items-center text-primary-600 dark:text-primary-400 hover:underline">
            查看全部 <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      {/* Categories Showcase */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          按分类浏览
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/categories/programming" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">编程</h3>
              <p className="text-gray-600 dark:text-gray-400">
                深入探讨编程语言、算法和编码最佳实践。
              </p>
            </div>
          </Link>
          
          <Link to="/categories/web-development" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">网络开发</h3>
              <p className="text-gray-600 dark:text-gray-400">
                探索前端、后端和全栈网络开发主题。
              </p>
            </div>
          </Link>
          
          <Link to="/categories/technology" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">技术</h3>
              <p className="text-gray-600 dark:text-gray-400">
                了解科技世界的最新趋势和技术发展。
              </p>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          订阅通讯
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
          及时获取最新文章和资讯。我们只发送优质内容，绝不发送垃圾邮件。
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="输入您的邮箱" 
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-900"
            required
          />
          <Button type="submit">
            订阅
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default HomePage;