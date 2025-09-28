#!/bin/bash

# Paytm Demo Cleanup Script
echo "🧹 Cleaning up Paytm Demo environment..."

# Stop and remove containers
echo "🛑 Stopping and removing containers..."
docker-compose down

# Remove volumes (optional - uncomment if you want to delete all data)
# echo "🗑️ Removing volumes..."
# docker-compose down -v

# Remove images (optional - uncomment if you want to delete images)
# echo "🖼️ Removing images..."
# docker rmi paytm-monorepo_backend paytm-monorepo_frontend paytm-monorepo_mongo-express 2>/dev/null || true

# Clean up dangling images and containers
echo "🧽 Cleaning up dangling resources..."
docker system prune -f

# Remove node_modules if they exist
echo "📦 Removing node_modules..."
rm -rf backend/node_modules frontend/node_modules 2>/dev/null || true

# Remove build artifacts
echo "🏗️ Removing build artifacts..."
rm -rf frontend/dist backend/dist 2>/dev/null || true

# Remove environment files (optional - uncomment if you want to delete .env files)
# echo "🔐 Removing environment files..."
# rm -f backend/.env frontend/.env 2>/dev/null || true

echo "✅ Cleanup completed!"
echo ""
echo "💡 To start fresh, run: ./scripts/setup.sh"
