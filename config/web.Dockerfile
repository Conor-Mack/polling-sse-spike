FROM node:22-slim

WORKDIR /app

RUN corepack enable pnpm && corepack install -g pnpm@latest-10

# Copy minimal files needed for dependency resolution
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
# COPY packages/*/package.json ./packages/*/

# Copy only Web app source code and its dependencies
COPY apps/web ./apps/web
# COPY packages ./packages

# Install dependencies directly (no fetch+offline approach)
# This ensures platform-specific dependencies are properly installed
RUN pnpm install --filter=web...

# Set working directory to the Web app
WORKDIR /app/apps/web

# Expose Vite's default port
EXPOSE 5173

# Start the Vite dev server
CMD ["pnpm", "start"]