# server/Dockerfile

FROM node:20-alpine

WORKDIR /app

# We're already in server/ directory due to build context
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3550
CMD ["node", "server.js"]
