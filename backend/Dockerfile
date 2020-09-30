FROM node:12-alpine
ADD package*.json ./
RUN yarn
COPY . .
WORKDIR /app
EXPOSE 3333
