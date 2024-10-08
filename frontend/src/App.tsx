import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogView from './pages/BlogView';
import NewPost from './pages/NewPost';

// Create a context to manage authentication state across the app
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function App() {
  // Use state to keep track of authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    console.log('App mounted. Authentication status:', isAuthenticated);
  }, []);

  useEffect(() => {
    console.log('Authentication status changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Protected routes: Redirect to login if not authenticated */}
              <Route
                path="/blog"
                element={isAuthenticated ? <BlogView /> : <Navigate to="/login" />}
              />
              <Route
                path="/new-post"
                element={isAuthenticated ? <NewPost /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;