import express from 'express';
import { generateToken, authMiddleware, UserPayload } from './auth';
import axios from 'axios';

const router = express.Router();

const BACKEND_URL = 'http://localhost:5000/api';

router.post('/signup', async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/signup`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ message: 'Error signing up', error: error.response?.data });
  }
});

router.post('/login', async (req, res) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, req.body);
      const { token, user } = response.data;
      const userPayload: UserPayload = { userId: user.id, email: user.email };
      const middlewareToken = generateToken(userPayload);
      res.json({ token: middlewareToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials', error: error.response?.data });
    }
  });

router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/posts`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.post('/posts', authMiddleware, async (req: express.Request, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const response = await axios.post(`${BACKEND_URL}/posts`, {
      ...req.body,
      author: req.user.email
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post' });
  }
});

export default router;