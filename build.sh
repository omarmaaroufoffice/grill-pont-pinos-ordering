#!/bin/bash

echo "Starting build process..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Navigate to client directory and install dependencies
echo "Installing client dependencies..."
cd client
npm install

# Build the React app
echo "Building React app..."
npm run build

# Go back to root
cd ..

echo "Build process completed!"
echo "Build files should be in client/build/"
ls -la client/build/ || echo "Build directory not found!"
