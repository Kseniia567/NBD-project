# Dockerfile
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application files
COPY . .

# Expose application port (if needed)
EXPOSE 3000

# Default command to run your app
CMD ["yarn", "start"]