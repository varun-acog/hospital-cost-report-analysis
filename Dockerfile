# Use Node.js 18 Alpine as base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage using nginx default config
FROM nginx:alpine

# Copy built static assets to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (uses default config)
CMD ["nginx", "-g", "daemon off;"]
