# Multi-stage Dockerfile for running both the app and JSON Server

# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build:dev

# Stage 2: Serve the React app and run JSON Server
FROM node:18-alpine

WORKDIR /app

# Copy the built application
COPY --from=build /app/dist /usr/share/nginx/html

# Install JSON Server globally
RUN npm install -g json-server

# Copy mock data for JSON Server
COPY src/mock-data/db.json ./mock-data/db.json

# Copy a script to run both services
COPY run.sh ./run.sh
RUN chmod +x ./run.sh

# Expose necessary ports
EXPOSE 3000 3001

# Command to run both services
CMD ["./run.sh"]
