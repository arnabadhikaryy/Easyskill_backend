FROM node:latest
WORKDIR /APP
COPY ./backend package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD npm run dev
