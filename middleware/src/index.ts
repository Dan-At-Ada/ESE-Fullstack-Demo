import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware } from './auth';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Apply authMiddleware only to protected routes
app.use('/api/posts', authMiddleware);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Middleware server running on port ${port}`);
});