FROM node:16-alpine AS build

WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy build artifacts
COPY --from=build /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]