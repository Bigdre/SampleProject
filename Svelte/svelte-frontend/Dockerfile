# Use the official Node.js image as the parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the application source code into the container
COPY . .

# Build the application for production
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:1.21

# Copy the static files from the Svelte build
COPY --from=0 /app/public /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]