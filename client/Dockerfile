# client/Dockerfile

# Base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY client/package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the files
COPY client/ .

# Build the app
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
