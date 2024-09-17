import express from 'express';
import { generateToken, UserPayload } from './auth';
import axios from 'axios';

const router = express.Router();

const BACKEND_URL = 'http://localhost:5000/api';

router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body.email);
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/signup`, req.body);
    console.log('Signup successful: ', req.body.email);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Signup error:', error.response?.data);
    res.status(400).json({ message: 'Error signing up', error: error.response?.data });
  }
});

router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body.email);
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, req.body);
    const { token, user } = response.data;
    const userPayload: UserPayload = { userId: user._id, email: user.email };
    const middlewareToken = generateToken(userPayload);
    console.log('Login successful, token generated: ', req.body.email);
    res.json({ token: middlewareToken });
  } catch (error) {
    console.error('Login error:', error.response?.data);
    res.status(401).json({ message: 'Invalid credentials', error: error.response?.data });
  }
});

router.get('/posts', async (req, res) => {
  console.log('Fetching posts');
  try {
    const response = await axios.get(`${BACKEND_URL}/posts`);
    console.log(`${response.data.length} posts fetched`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.post('/posts', async (req: express.Request, res) => {
  if (!req.user) {
    console.log('Unauthorized post creation attempt');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('Creating new post for user:', req.user.email, req.body.title);
  try {
    const response = await axios.post(`${BACKEND_URL}/posts`, {
      ...req.body,
      author: req.user.email
    });
    console.log('Post created successfully');
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: 'Error creating post' });
  }
});

export default router;