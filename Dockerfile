# command
# docker build -t client-salon -f Dockerfile .
# docker run -dp 5540:80 --name api-hairsalon  client-salon
# docker run -dp {PortLocal}:80 --name {name container}  client-salon

# Declare the base image
FROM node
# Copy package.json and package-lock.json to /app dir
RUN mkdir /app
COPY package*.json /app
# Change working directory to newly created app dir
WORKDIR /app
# Install dependencies
RUN npm ci
# Copy the source code to /app dir
COPY . .
# Expose port 80 on the container
EXPOSE 80
# Run the app
CMD ["npm", "run", "dev"]
