# Use the official Node.js 16 and the official image for ViteJS as a parent image
FROM node:16-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the application for production
RUN npm run build

# Use Nginx to serve the React app
FROM nginx:stable-alpine as production-stage

# Copy the built app to Nginx's serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]