# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR.

## Getting Started

### Installation

To install the dependencies, run:

```bash
npm install
```

### Starting the Project

#### Start Mock Data Server

Run the following command to start the mock data server:

```bash
npx json-server --watch src/mock-data/db.json --port 3001
```

#### Start the Development Server

Run the development server:

```bash
npm run dev
```

#### Build for Production

To create a production build, run:

```bash
npm run build:dev
npm run build:prod
```

#### Preview the Production Build

To preview the production build locally, run:

```bash
npm run start
```

### Build and Run the Docker Container

1. Build the Docker image:

```bash
docker build -t sfui-shopping .
```

2. Run the container:

```bash
docker run -p 3000:3000 -p 3001:3001 sfui-shopping
```

Your application will be available at `http://localhost:3000`.

## Project Structure
```
project-root/
├── src/
│   ├── components/     # Reusable React components and pages
│   ├── hooks/          # Custom React hooks
│   ├── store/          # State management using Zustand
│   ├── utils/          # Utility functions and helpers
│   ├── mock-data/      # Mock data for JSON server
│   ├── index.css       # Global css & tailwindcss
│   └── main.tsx        # Main application component & routing
├── public/             # Static assets
├── tests/              # Unit and integration tests
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── README.md           # Documentation
```

## Libraries and Frameworks
- **React**: Front-end framework for building UI.
- **TypeScript**: Static typing for JavaScript.
- **Vite**: Fast development build tool.
- **Zustand**: State management library.
- **JSON Server**: Mock data server for API simulation.
- **Jest**: For unit and integration testing.

## Technical Supported
1. State management with Zustand.
2. Mock API integration using JSON Server.
3. TypeScript support for improved development.

## Feature Supported

**Page Supported**: 
- [Home](https://sfui-shopping-website.onrender.com)
- [Search](https://sfui-shopping-website.onrender.com/search)
- [Product detail](https://sfui-shopping-website.onrender.com/products/:id)
- [Cart](https://sfui-shopping-website.onrender.com/cart)
- [Order](https://sfui-shopping-website.onrender.com/orders)
- [Checkout](https://sfui-shopping-website.onrender.com/checkout)
- [Order Detail](https://sfui-shopping-website.onrender.com/orders/:id)

**1. Filter and pagination products**
**2. Product detail**
**3. Add products to card**
**4. Checkout with mock payment**
**5. Order list and order detail**

## Planned Features
1. Internationalization (i18n) support.
2. Authentication and user management.
3. Integration with a real backend API and real payment system.
4. Enhanced testing coverage.
5. Responsive design improvements.

## Deployment Guide

### Deploying on Render
I deploy both the React application and the JSON Server to Render using the following steps:

#### **Step 1: Deploy JSON Server**
1. Push your project to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Configure the service:
   - **Environment**: Select `Node`.
   - **Build Command**: `npm install`
   - **Start Command**: `npx json-server --watch src/mock-data/db.json --port 10000`
4. Deploy the service and note the URL (e.g., `https://sfui-shopping.onrender.com`).

#### **Step 2: Deploy React Application**
1. Push the project to your GitHub/GitLab repository.
2. Go to [Render](https://render.com/) and create a new **Static Site**.
3. Configure the site:
   - **Build Command**: `npm install; npm run build:prod`
   - **Publish Directory**: `dist`
4. Deploy the site and note the URL (e.g., `https://sfui-shopping-website.onrender.com`).
