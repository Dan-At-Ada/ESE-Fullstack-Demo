import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../utils/api';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

const BlogView: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      console.log('Fetching blog posts');
      try {
        // Fetch posts using the API utility
        const data = await fetchPosts();
        console.log('Posts fetched successfully:', data.length);
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        if (err instanceof Error && err.message === 'Authentication token expired') {
          console.log('Token expired, redirecting to login');
          // Redirect to login page if the token has expired
          navigate('/login');
        } else {
          setError('Failed to fetch posts');
        }
      }
    };

    fetchBlogPosts();
  }, [navigate]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mb-2">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogView;