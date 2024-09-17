import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
      <p className="mb-8">Explore our latest posts or create your own!</p>
      <div className="space-x-4">
        <Link to="/blog" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          View Blog
        </Link>
        <Link to="/new-post" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default Home;