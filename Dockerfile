# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Start the NestJS application
CMD ["node", "dist/main.js"]