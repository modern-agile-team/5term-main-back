FROM node:18.16.0 AS builder

WORKDIR /app

COPY . .

RUN npm ci

ENTRYPOINT [ "npm", "run" ,"start:dev" ]