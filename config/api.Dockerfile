FROM node:22-slim

WORKDIR /app

RUN corepack enable pnpm && corepack install -g pnpm@latest-10
# Copy minimal files needed for dependency resolution
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/

# Copy only API source code and its dependencies
COPY apps/api ./apps/api
COPY packages ./packages

# Install dependencies directly (no fetch+offline approach)
# This ensures platform-specific dependencies are properly installed
RUN pnpm install --filter=api...

# Set working directory to the API app
WORKDIR /app/apps/api

# Expose the API port
EXPOSE 5174

# Start the API server
CMD ["pnpm", "start"]