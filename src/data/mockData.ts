import { BlogPost, Comment, User } from '../types';
import { format } from 'date-fns';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock blog posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a new React project with TypeScript and the benefits it brings to your development workflow.',
    content: `
# Getting Started with React and TypeScript

TypeScript has become increasingly popular in the React ecosystem, and for good reason. It adds static type checking to your JavaScript code, helping catch errors early in the development process.

## Setting Up a New Project

To create a new React project with TypeScript, you can use Create React App with the TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## Benefits of TypeScript

1. **Type Safety**: TypeScript helps catch errors during development rather than at runtime.
2. **Better IDE Support**: You'll get improved autocomplete, navigation, and refactoring capabilities.
3. **Enhanced Documentation**: Types serve as documentation that's always up to date.
4. **Improved Team Collaboration**: Makes it easier for teammates to understand and work with your code.

## Basic Type Examples

\`\`\`tsx
// Typing component props
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

// Using the component
function App() {
  return (
    <Button 
      text="Click Me" 
      onClick={() => console.log('Button clicked')} 
    />
  );
}
\`\`\`

This is just the beginning! TypeScript offers many more features to make your React development more robust and maintainable.
    `,
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    tags: ['React', 'TypeScript', 'Web Development'],
    category: 'Programming',
    author: users[0],
    publishedAt: format(new Date('2023-03-15'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-03-15'), 'yyyy-MM-dd'),
    isPublished: true,
  },
  {
    id: '2',
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt: 'Explore the latest CSS features and techniques that can transform your web development workflow.',
    content: `
# Modern CSS Techniques Every Developer Should Know

CSS has evolved significantly in recent years, introducing powerful features that make styling more flexible and less dependent on JavaScript. Here are some modern CSS techniques that every developer should know.

## CSS Grid Layout

CSS Grid is a two-dimensional layout system that revolutionizes how we structure web pages:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## CSS Custom Properties (Variables)

Custom properties bring true variables to CSS:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #f59e0b;
}

.button {
  background-color: var(--primary-color);
  color: white;
}

.button:hover {
  background-color: var(--secondary-color);
}
\`\`\`

## CSS Logical Properties

Logical properties help create more adaptable layouts across different writing modes and reading directions:

\`\`\`css
.element {
  margin-inline: 1rem; /* horizontal margin */
  padding-block: 0.5rem; /* vertical padding */
}
\`\`\`

## Container Queries

Container queries allow you to apply styles based on the size of a parent container rather than the viewport:

\`\`\`css
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

Stay up-to-date with these modern CSS techniques to build more responsive, maintainable, and powerful web interfaces.
    `,
    coverImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    tags: ['CSS', 'Web Design', 'Frontend'],
    category: 'Web Development',
    author: users[1],
    publishedAt: format(new Date('2023-04-22'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-04-28'), 'yyyy-MM-dd'),
    isPublished: true,
  },
  {
    id: '3',
    title: 'Building a Personal Blog with React and Markdown',
    excerpt: 'Learn how to create your own personal blog using React with Markdown support for content creation.',
    content: `
# Building a Personal Blog with React and Markdown

Creating a personal blog is a great way to share your thoughts and showcase your work. In this post, we'll explore how to build a blog using React with Markdown support for content creation.

## Why React and Markdown?

React provides a component-based architecture that makes it easy to build interactive UIs, while Markdown offers a simple syntax for writing content without dealing with complex HTML.

## Setting Up the Project

First, create a new React project:

\`\`\`bash
npm create vite@latest my-blog -- --template react-ts
cd my-blog
npm install
\`\`\`

## Adding Markdown Support

Install a Markdown parser like remark:

\`\`\`bash
npm install remark remark-html react-markdown
\`\`\`

## Creating the Blog Post Component

\`\`\`tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogPostProps {
  title: string;
  content: string;
  publishedDate: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, publishedDate }) => {
  return (
    <article className="blog-post">
      <h1>{title}</h1>
      <time>{publishedDate}</time>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default BlogPost;
\`\`\`

## Adding Authentication

For a personal blog, you'll want to add authentication to control who can create and edit posts:

\`\`\`tsx
// Simple authentication context
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Implement your authentication logic here
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
\`\`\`

Building your own blog gives you complete control over the design and functionality, and it's a great way to showcase your skills as a developer.
    `,
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    tags: ['React', 'Markdown', 'Blog'],
    category: 'Web Development',
    author: users[0],
    publishedAt: format(new Date('2023-05-10'), 'yyyy-MM-dd'),
    updatedAt: format(new Date('2023-05-12'), 'yyyy-MM-dd'),
    isPublished: true,
  },
];

// Mock comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'This is a great introduction to TypeScript with React. I\'ve been wanting to learn more about it!',
    author: users[1],
    createdAt: format(new Date('2023-03-16'), 'yyyy-MM-dd'),
    postId: '1',
  },
  {
    id: '2',
    content: 'I\'ve been using TypeScript for a while now and can definitely vouch for its benefits. The type safety alone has saved me from countless bugs.',
    author: {
      id: '3',
      name: 'Alex Johnson',
      email: 'alex@example.com',
    },
    createdAt: format(new Date('2023-03-17'), 'yyyy-MM-dd'),
    postId: '1',
  },
  {
    id: '3',
    content: 'CSS Grid has completely changed how I approach layouts. Great overview of modern techniques!',
    author: users[0],
    createdAt: format(new Date('2023-04-23'), 'yyyy-MM-dd'),
    postId: '2',
  },
];

// Utility functions
export const getBlogPosts = () => blogPosts;
export const getBlogPost = (id: string) => blogPosts.find(post => post.id === id);
export const getPostComments = (postId: string) => comments.filter(comment => comment.postId === postId);