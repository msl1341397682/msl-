import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again. Use demo@example.com / password for demo.');
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 text-center">
          Log in to Your Account
        </h1>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <Link to="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
          
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
              Register
            </Link>
          </p>
        </form>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
            For demo purposes, use:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-sm text-gray-600 dark:text-gray-400">
            <p>Email: <span className="font-mono">demo@example.com</span></p>
            <p>Password: <span className="font-mono">password</span></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;