FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Use npm install instead of ci, ignore platform issues
RUN npm install --omit=dev --force

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
