const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';

async function viewPosts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db('blogdb');
    const posts = await db.collection('posts').find({}).toArray();

    console.log('\nPosts:');
    posts.forEach(post => {
      console.log(`Title: ${post.title}`);
      console.log(`Content: ${post.content}`);
      console.log(`Author: ${post.author}`);
      console.log(`Date: ${post.date}`);
      console.log('---');
    });

  } finally {
    await client.close();
  }
}

viewPosts().catch(console.error);