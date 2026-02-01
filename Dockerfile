FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies (including dev) for build
RUN npm install --force

COPY . .

# Build the app
RUN npm run build

# Clean up dev dependencies after build
RUN npm prune --omit=dev

CMD ["npm", "run", "start"]
