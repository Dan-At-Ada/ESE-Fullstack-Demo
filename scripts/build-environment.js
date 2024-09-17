const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building environment...');

// Check if Docker is installed and running
function checkDocker() {
  return new Promise((resolve, reject) => {
    exec('docker info', (error, stdout, stderr) => {
      if (error) {
        console.error('Docker is not running or not installed. Please install Docker and ensure it\'s running, then try again.');
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function buildEnvironment() {
  try {
    await checkDocker();

    // Ensure .env file exists
    if (!fs.existsSync('.env')) {
      console.log('Creating .env file...');
      fs.copyFileSync('.env.example', '.env');
    }

    // Run install:all script
    console.log('Installing dependencies...');
    require('child_process').execSync('npm run install:all', { stdio: 'inherit' });

    // Run setup:db script
    console.log('Setting up database...');
    require('child_process').execSync('npm run setup:db', { stdio: 'inherit' });

    console.log('Environment setup complete!');
  } catch (error) {
    console.error('Error during environment setup:', error.message);
    process.exit(1);
  }
}

buildEnvironment();