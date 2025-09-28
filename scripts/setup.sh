#!/bin/bash

# Paytm Demo Setup Script
echo "🚀 Setting up Paytm Demo Monorepo..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p scripts

# Set up environment files
echo "⚙️ Setting up environment files..."

# Backend environment
if [ ! -f backend/.env ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env file"
else
    echo "⚠️ backend/.env already exists, skipping..."
fi

# Make scripts executable
chmod +x scripts/*.sh 2>/dev/null || true

echo "🐳 Building and starting Docker containers..."
docker-compose up -d --build

echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."

# Check MongoDB
if docker-compose ps mongodb | grep -q "Up"; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start"
fi

# Check Backend
if docker-compose ps backend | grep -q "Up"; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
fi

# Check Frontend
if docker-compose ps frontend | grep -q "Up"; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start"
fi

# Test API endpoints
echo "🧪 Testing API endpoints..."

# Wait a bit more for services to be fully ready
sleep 10

# Test health endpoint
if curl -s http://localhost:4000/api/health > /dev/null; then
    echo "✅ Backend API is responding"
else
    echo "❌ Backend API is not responding"
fi

# Test frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:4000"
echo "   MongoDB Express: http://localhost:8081 (admin/admin123)"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Rebuild: docker-compose up -d --build"
echo ""
echo "📚 For more information, check the README.md file"
