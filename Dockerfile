# Node.js version: 20.9.0
FROM node:20.9.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
COPY . /app

# Install app dependencies
RUN npm install

# Bundle app source
EXPOSE 3000

# Run the app
CMD ["npm", "start" ]


