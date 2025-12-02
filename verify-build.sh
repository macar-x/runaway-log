#!/bin/bash
set -e

echo "🔍 Verifying Hit Button App build..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found. Running build..."
    npm run build
fi

# Check for required files
echo "✓ Checking build artifacts..."
[ -f "dist/index.html" ] && echo "  ✓ index.html found" || { echo "  ❌ index.html missing"; exit 1; }
[ -d "dist/assets" ] && echo "  ✓ assets directory found" || { echo "  ❌ assets directory missing"; exit 1; }

# Check Docker files
echo "✓ Checking Docker configuration..."
[ -f "Dockerfile" ] && echo "  ✓ Dockerfile found" || { echo "  ❌ Dockerfile missing"; exit 1; }
[ -f "compose.yml" ] && echo "  ✓ compose.yml found" || { echo "  ❌ compose.yml missing"; exit 1; }
[ -f "nginx.conf" ] && echo "  ✓ nginx.conf found" || { echo "  ❌ nginx.conf missing"; exit 1; }
[ -f ".dockerignore" ] && echo "  ✓ .dockerignore found" || { echo "  ❌ .dockerignore missing"; exit 1; }

echo ""
echo "✅ All checks passed!"
echo ""
echo "To build and run with Docker:"
echo "  docker compose up -d"
echo ""
echo "To build Docker image manually:"
echo "  docker build -t hit-button-app ."
echo ""
