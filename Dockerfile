FROM node:20.11 As development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .