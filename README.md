# ESE-Fullstack-Demo | Full Stack Blog App
# Full Stack Blog App

## Setup Instructions

1. Ensure you have Node.js and MongoDB installed on your system.

2. Clone this repository:

git clone [https://github.com/your-username/full-stack-blog-app.git](https://github.com/your-username/full-stack-blog-app.git)
cd full-stack-blog-app

3. Build the environment:

npm run build:environment
This script will:
- Create a `.env` file if it doesn't exist
- Install all dependencies for the root project, frontend, middleware, and backend
- Set up the MongoDB database with required collections and indexes

4. Start the application:

npm start

This will start the frontend, middleware, and backend concurrently.

## Available Scripts

- `npm run build:environment`: Sets up the entire environment
- `npm run install:all`: Installs dependencies for all parts of the application
- `npm run setup:db`: Sets up the MongoDB database
- `npm start`: Starts the entire application (frontend, middleware, and backend)
- `npm run start:frontend`: Starts only the frontend
- `npm run start:middleware`: Starts only the middleware
- `npm run start:backend`: Starts only the backend

With these scripts in place, you can now set up your environment by running:

npm run build:environment

This will perform all the necessary setup tasks, including installing dependencies and setting up the database. You can then start your application using:

npm start