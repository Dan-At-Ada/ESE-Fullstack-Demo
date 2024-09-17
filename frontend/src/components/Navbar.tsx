import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { logout } from '../utils/api';

const Navbar: React.FC = () => {
  // Access the authentication context
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout initiated');
    // Call the logout function from the API utility
    logout();
    // Update the authentication state
    setIsAuthenticated(false);
    console.log('User logged out');
    // Redirect to the home page
    navigate('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">
            <Link to="/">My Blog</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            {isAuthenticated ? (
              <>
                {/* Show these links only when authenticated */}
                <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
                <Link to="/new-post" className="text-gray-700 hover:text-gray-900">New Post</Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-gray-900">Logout</button>
              </>
            ) : (
              <>
                {/* Show these links when not authenticated */}
                <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
                <Link to="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;