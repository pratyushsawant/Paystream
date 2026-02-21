#!/bin/bash

# PayStream — Start backend + frontend together
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  🚀 Starting PayStream..."
echo ""

# Start backend
cd "$ROOT/paystream_Backend"
node server.js &
BACKEND_PID=$!
echo "  ✓ Backend running (PID $BACKEND_PID) → http://localhost:3001"

# Start frontend
cd "$ROOT/paystream_Frontend"
npm run dev &
FRONTEND_PID=$!
echo "  ✓ Frontend running (PID $FRONTEND_PID) → http://127.0.0.1:8080"

echo ""
echo "  Press Ctrl+C to stop both."
echo ""

# Kill both on exit
trap "echo ''; echo '  Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM

wait
