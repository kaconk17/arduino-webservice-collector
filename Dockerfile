FROM node:lts-alpine3.17
WORKDIR /app
COPY . /app
RUN npm install
RUN chown -R node:node /app
USER node
EXPOSE 1883
CMD node index.js