# Use the official Go image with the specific version
FROM golang:1.23.2

# Install Node.js and Yarn
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /workspace

# Copy all
COPY . .

# Install Node.js dependencies
RUN pnpm install

# Install Go dependencies
RUN cd go && go mod tidy