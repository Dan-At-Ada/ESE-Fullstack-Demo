#!/bin/bash

# Install dependencies for all parts of the application
echo "Installing dependencies..."
npm install
cd frontend && npm install && cd ..
cd middleware && npm install && cd ..
cd backend && npm install && cd ..

# Setup environment variables
echo "Setting up environment variables..."
cp .env.example .env

# Initialize the database
echo "Initializing the database..."
node init-db.js

echo "Setup complete! You can now run the application with 'npm start'"