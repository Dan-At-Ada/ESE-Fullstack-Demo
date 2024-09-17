import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware } from './auth';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware setup
app.use(cors());
app.use(express.json());

console.log('Middleware server starting...');

// Apply authMiddleware only to protected routes
app.use('/api/posts', authMiddleware);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Middleware server running on port ${port}`);
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});