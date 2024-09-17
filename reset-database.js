const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';

async function resetDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db('blogdb');
    
    // Drop the users collection
    await db.collection('users').drop();
    console.log('Users collection dropped');

    // Drop the posts collection
    await db.collection('posts').drop();
    console.log('Posts collection dropped');

    console.log('Database reset complete');

  } catch (error) {
    if (error.code === 26) {
      console.log('Collections do not exist. Database is already clean.');
    } else {
      throw error;
    }
  } finally {
    await client.close();
  }
}

resetDatabase().catch(console.error);