FROM node:8.9.4 as builder

RUN npm install webpack-cli -g
RUN npm install webpack -g

# Create app directory
WORKDIR /tmp

# Copy node server files
COPY package.json .
COPY package-lock.json .
COPY public .
RUN npm install

WORKDIR /usr/src/app

# Copy react-bundle
COPY . /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app
RUN webpack --config webpack.prod.js

FROM node:alpine
MAINTAINER grittly

ARG port=4000

# Create app directory
WORKDIR /usr/src/app

# Copy node server files
COPY express-server .

RUN npm install

# Copy react-bundle
COPY --from=builder /usr/src/app/dist public/

EXPOSE $port

ENV PORT $port

CMD ["npm", "start"]
