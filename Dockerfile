FROM node:alpine
MAINTAINER grittly

ARG port=4000

# Create app directory
WORKDIR /usr/src/app

# Copy node server files
COPY server-docker .

RUN npm install

# Copy react-bundle
COPY dist public/

EXPOSE $port

ENV PORT $port

CMD ["npm", "start"]
