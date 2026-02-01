FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --force

COPY . .

# Build the app
RUN npm run build

# Install a lightweight static file server
RUN npm install -g serve

# Expose port 3000 (what Coolify expects)
EXPOSE 3000

# Serve the built Angular app on port 3000
CMD ["serve", "-s", "dist/box-walks-website/browser", "-l", "3000"]
