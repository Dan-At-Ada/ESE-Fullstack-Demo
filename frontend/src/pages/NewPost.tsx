import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../utils/api';

const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new post:', { title, content });
    try {
      // Create a new post using the API utility
      await createPost(title, content);
      console.log('Post created successfully');
      // Redirect to the blog page after successful post creation
      navigate('/blog');
    } catch (err) {
      console.error('Error creating post:', err);
      if (err instanceof Error && err.message === 'Authentication token expired') {
        console.log('Token expired, redirecting to login');
        // Redirect to login page if the token has expired
        navigate('/login');
      } else {
        setError('Failed to create post');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;