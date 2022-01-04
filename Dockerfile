FROM node:16.13

LABEL maintainer="Jiheon Lee <jiheon.lee.dev@gmail.com>"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]