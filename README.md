# Express Vite React Monorepo

A monorepo setup with Express API and Vite React frontend using pnpm workspaces.

## Project Structure

- `apps/api`: Express API backend
- `apps/web`: Vite React frontend
- `packages/`: Shared packages/libraries

## Docker Setup

This project includes Docker configuration for easy development and deployment.

### Running with Docker Compose

To start both the API and web app together:

```bash
docker compose up
```

This will:

- Build both containers
- Start the API on http://localhost:3000
- Start the web app on http://localhost:5173
- Set up hot-reloading for both services

For development, local changes to source files will be reflected immediately thanks to the volume mounts.

### Individual Docker Builds

If you need to build and run the containers separately:

```bash
# Build and run API
docker build -t api-image -f api.Dockerfile .
docker run -p 3000:3000 api-image

# Build and run Web app
docker build -t web-image -f web.Dockerfile .
docker run -p 5173:5173 web-image
```

## Development Without Docker

Setup:

```bash
pnpm install
```

Run API:

```bash
cd apps/api
pnpm start
```

Run Web app:

```bash
cd apps/web
pnpm start
```
