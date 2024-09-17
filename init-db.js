const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';

async function initializeDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db('blogdb');

    // Create collections
    await db.createCollection('users');
    await db.createCollection('posts');

    console.log('Database initialized successfully');
  } finally {
    await client.close();
  }
}

initializeDatabase().catch(console.error);