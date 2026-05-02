# Use Node 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port (AWS will use this to route traffic)
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
