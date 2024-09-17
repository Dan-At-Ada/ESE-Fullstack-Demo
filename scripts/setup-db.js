const { exec, execSync } = require('child_process');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const DOCKER_CONTAINER_NAME = 'blogapp-mongodb';
const MONGODB_PORT = 27017;
const MONGODB_DATABASE = 'blogdb';

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(`stderr: ${stderr}`);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function setupDocker() {
  console.log('Setting up Docker container for MongoDB...');

  try {
    // Check if Docker is running
    await runCommand('docker info');
  } catch (error) {
    console.error('Docker is not running. Please start Docker and try again.');
    process.exit(1);
  }

  try {
    // Check if the container already exists
    const containerExists = await runCommand(`docker ps -a --format '${DOCKER_CONTAINER_NAME}'`);

    if (containerExists) {
      console.log('MongoDB container already exists. Starting it...');
      await runCommand(`docker start ${DOCKER_CONTAINER_NAME}`);
    } else {
      console.log('Creating and starting MongoDB container...');
      await runCommand(`docker run -d --name ${DOCKER_CONTAINER_NAME} -p ${MONGODB_PORT}:27017 mongo:latest`);
    }

    console.log('Waiting for MongoDB to start...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

    console.log('MongoDB container is ready.');
  } catch (error) {
    console.error('Error setting up Docker:', error.message);
    process.exit(1);
  }
}

async function setupDatabase() {
  const uri = `mongodb://localhost:${MONGODB_PORT}/${MONGODB_DATABASE}`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db();

    // Create collections
    await db.createCollection('users');
    await db.createCollection('posts');

    console.log('Collections created successfully');

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('posts').createIndex({ author: 1 });

    console.log('Indexes created successfully');

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

async function main() {
  await setupDocker();
  await setupDatabase();

  // Update .env file with MongoDB URI
  const envPath = path.resolve(__dirname, '..', '.env');
  const envContent = `MONGODB_URI=mongodb://localhost:${MONGODB_PORT}/${MONGODB_DATABASE}\n` +
                     `JWT_SECRET=${process.env.JWT_SECRET || 'your_jwt_secret_here'}\n`;

  fs.writeFileSync(envPath, envContent);
  console.log('.env file updated with MongoDB URI');

  console.log('Setup complete!');
}

main().catch(console.error);