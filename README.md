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
npm run build
```

#### Preview the Production Build

To preview the production build locally, run:

```bash
npm run preview
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

