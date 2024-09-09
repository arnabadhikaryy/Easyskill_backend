FROM node:22.2.0
WORKDIR /APP
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "dev", "2_server.js"]
