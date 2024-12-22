#!/bin/sh

# Start JSON Server in the background
json-server --watch /app/mock-data/db.json --port 3001 &

# Serve the React app using a lightweight HTTP server
npx http-server /usr/share/nginx/html -p 3000
