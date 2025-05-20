import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Layout from '../components/layout/Layout';
import { getBlogPosts } from '../data/mockData';

const ArchivePage: React.FC = () => {
  const posts = getBlogPosts();
  
  // 按年份对文章进行分组
  const groupedPosts = posts.reduce((groups, post) => {
    const year = format(parseISO(post.publishedAt), 'yyyy');
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
    return groups;
  }, {} as Record<string, typeof posts>);

  // 获取所有年份并排序
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">
          文章归档
        </h1>

        {years.map(year => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              {year}年
            </h2>
            <div className="space-y-4">
              {groupedPosts[year].map(post => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-xl font-serif font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {format(parseISO(post.publishedAt), 'MM-dd')}
                    </time>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ArchivePage;