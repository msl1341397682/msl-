import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, PenSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <PenSquare size={24} className="text-primary-600 dark:text-primary-400" />
          <span className="text-xl font-serif font-bold text-gray-900 dark:text-white">个人博客</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">首页</Link>
          <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">博客</Link>
          <Link to="/archive" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">归档</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">关于</Link>
          <Link to="/dashboard/new" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">写文章</Link>
          
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Button onClick={handleLogout} variant="ghost" size="sm">退出</Button>
              <Link to="/profile" className="flex items-center">
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/40'} 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={toggleMenu}
          aria-label="切换菜单"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 shadow-md transition-all">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              onClick={toggleMenu}
            >
              首页
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              onClick={toggleMenu}
            >
              博客
            </Link>
            <Link 
              to="/archive" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              onClick={toggleMenu}
            >
              归档
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              onClick={toggleMenu}
            >
              关于
            </Link>
            <Link 
              to="/dashboard/new" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              onClick={toggleMenu}
            >
              写文章
            </Link>
            
            <button
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
              aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={20} className="mr-2" /> 亮色模式
                </>
              ) : (
                <>
                  <Moon size={20} className="mr-2" /> 暗色模式
                </>
              )}
            </button>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  个人资料
                </Link>
                <Button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }} 
                  variant="ghost" 
                  fullWidth
                >
                  退出登录
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;