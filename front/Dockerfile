# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Expose port 5173
EXPOSE 5173

# Define the command to serve the static files
CMD ["npm","run", "dev"]
