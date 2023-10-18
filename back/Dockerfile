# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Bundle the app source code inside the Docker image
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Expose port 8000
EXPOSE 8000

# Define the command to run your application
CMD ["node", "app.js"]
