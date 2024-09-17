const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';

async function viewUsers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db('blogdb');
    const users = await db.collection('users').find({}).toArray();

    console.log('\nUsers:');
    users.forEach(user => {
      console.log(`Email: ${user.email}, Password: ${user.password}`);
    });

  } finally {
    await client.close();
  }
}

viewUsers().catch(console.error);