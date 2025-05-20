import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Layout from '../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            About This Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A place to share thoughts, ideas, and knowledge
          </p>
        </header>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Blog Author" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">John Doe</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Hi, I'm John! I'm a full-stack developer with a passion for creating intuitive, dynamic user experiences. 
                This blog is where I share what I've learned throughout my journey in web development and programming.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                My goal is to create content that helps others learn and grow in their development careers. 
                I believe in sharing knowledge freely and building a supportive community.
              </p>
              
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:john@example.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Mail size={20} />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Why I Started This Blog
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              I created this blog as a way to document my learning process and share my insights with others. As a developer, I believe in the importance of giving back to the community that has helped me grow.
            </p>
            <p>
              Writing helps me solidify my understanding of complex topics, and I hope that my explanations can help others who are on similar journeys. The tech industry moves quickly, and I find that teaching is one of the best ways to stay current.
            </p>
            <p>
              My focus is primarily on:
            </p>
            <ul>
              <li>Web development best practices</li>
              <li>React and TypeScript tutorials</li>
              <li>Practical coding techniques</li>
              <li>Career development for programmers</li>
            </ul>
          </div>
        </section>
        
        <section className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            Have a question or suggestion? I'd love to hear from you! Feel free to reach out through any of the channels below.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="mailto:john@example.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Mail size={20} className="mr-2" />
              Email
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Twitter size={20} className="mr-2" />
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;