const API_URL = 'http://localhost:3001/api';

export const login = async (email: string, password: string): Promise<string> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.token;
};

export const signup = async (email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await fetch(url, authOptions);

  if (response.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem('token');
    throw new Error('Authentication token expired');
  }

  return response;
};

export const fetchPosts = async (): Promise<any[]> => {
  const response = await authFetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const createPost = async (title: string, content: string): Promise<any> => {
  const response = await authFetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};