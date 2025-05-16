# server/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server .

EXPOSE 3550
CMD ["node", "server.js"]
