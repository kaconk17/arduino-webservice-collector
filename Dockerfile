FROM node:lts-slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 1883
CMD node index.js